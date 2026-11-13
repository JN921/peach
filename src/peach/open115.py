"""115 官方 Open API 客户端（阶段 1 骨架）。

只做两件事：登录（PKCE 扫码换 token、自动刷新）和读目录 / 换直链。
不读文件字节、不做转码、不走 ``video/play``；播放只用 ``POST /open/ufile/downurl``
拿原盘直链（用户定稿）。

参数与字段名以可行性文档（``115-open-api-feasibility.md``）为准，来自公开的
语雀文档摘要与第三方 SDK 的描述，**尚未经真实账号实测**：阶段 0 原型核对
``qrcode/token`` / ``authCodeToToken`` / ``files`` 的实际请求字段与返回字段后，
这里的请求体与解析要按实测修正。不要把本模块的调用形状当成已验证的官方契约。

凭据规则：
- 应用凭据（AppID / AppSecret）只从环境变量 ``PEACH_115_APP_ID`` /
  ``PEACH_115_APP_SECRET`` 读，不进仓库、不进设置文件、不写日志。
- 用户 token 只存 Peach 数据目录 ``secrets/open115.json``（0600），只经
  :class:`Open115Store` 读写；:meth:`Open115Store.public` 永远不回 token 原值，
  也不回 ``code_verifier``。
"""
from __future__ import annotations

import base64
import hashlib
import json
import os
import secrets
import time
from dataclasses import dataclass
from pathlib import Path, PureWindowsPath
from typing import Any, Callable, Iterable

#: 115 开放平台两个域名（可行性 §2）：授权走 passportapi，业务走 proapi。
PASSPORT_BASE = "https://passportapi.115.com"
PROAPI_BASE = "https://proapi.115.com"
#: 刷新间隔下限：文档要求不要小于 2 小时。
MIN_REFRESH_INTERVAL_SECONDS = 2 * 3600
#: ``files`` 单页上限 1150；递归拉取用较小页长，少触发限流。
FILES_PAGE_SIZE = 200
#: 扫码二维码有效期未知，按 115 通用扫码会话给一个保守上限，只用于前端倒计时展示。
QRCODE_TTL_SECONDS = 300

#: PKCE verifier 长度区间（文档：43–128 位）。
PKCE_VERIFIER_MIN = 43
PKCE_VERIFIER_MAX = 128


class Open115Error(RuntimeError):
    """面向用户的 115 错误：只带中文原因与种类，不带原始错误码与 token。"""

    def __init__(self, kind: str, message: str) -> None:
        super().__init__(message)
        self.kind = kind
        self.message = message


def chinese_error(status: int, payload: Any = None) -> Open115Error:
    """把 HTTP 状态 / 115 返回体映射成中文错误。不回显原始错误体。"""
    if status in (401, 403):
        return Open115Error("unauthorized", "115 登录已过期，请重新扫码绑定")
    if status == 429:
        return Open115Error("rate_limited", "115 接口限流，请稍后再试，不要频繁刷新")
    if isinstance(payload, dict):
        code = str(payload.get("code") or payload.get("state") or "")
        if code in {"401", "402", "403"}:
            return Open115Error("unauthorized", "115 登录已过期，请重新扫码绑定")
        if code in {"429", "101001", "101002"}:
            return Open115Error("rate_limited", "115 接口限流，请稍后再试，不要频繁刷新")
        if code in {"404", "10001", "10002"}:
            return Open115Error("not_opened", "115 开放平台未开通此接口，请检查应用审核状态")
    if status == 404:
        return Open115Error("not_opened", "115 开放平台未开通此接口，请检查应用审核状态")
    if status >= 500:
        return Open115Error("network", "115 服务暂时不可用，请稍后再试")
    return Open115Error("network", "115 接口调用失败，请稍后再试")


def generate_pkce_pair() -> tuple[str, str]:
    """生成 PKCE 对：verifier 43–128 位，challenge 为 sha256 的 base64url。"""
    verifier = base64.urlsafe_b64encode(secrets.token_bytes(64)).rstrip(b"=").decode("ascii")
    verifier = verifier[:PKCE_VERIFIER_MAX]
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return verifier, challenge


@dataclass(frozen=True)
class Open115AppCredentials:
    """应用凭据：只从环境变量读，见 :func:`app_credentials_from_env`。"""

    app_id: str
    app_secret: str

    @property
    def configured(self) -> bool:
        return bool(self.app_id and self.app_secret)


def app_credentials_from_env(environ: dict[str, str] | None = None) -> Open115AppCredentials:
    """从环境变量读 AppID / AppSecret；缺失时返回空凭据，由调用方报“未配置”。"""
    env = os.environ if environ is None else environ
    return Open115AppCredentials(
        app_id=(env.get("PEACH_115_APP_ID") or "").strip(),
        app_secret=(env.get("PEACH_115_APP_SECRET") or "").strip(),
    )


@dataclass
class TokenSet:
    """一次换 token 的结果。``expires_at`` 为 None 表示文档未给确定有效期。"""

    access_token: str
    refresh_token: str = ""
    expires_at: float | None = None
    refresh_expires_at: float | None = None
    user_id: str = ""
    user_name: str = ""
    vip_level: str = ""

    @property
    def access_expired(self) -> bool:
        return self.expires_at is not None and time.time() >= self.expires_at


@dataclass(frozen=True)
class Open115File:
    """``GET /open/ufile/files`` 一项：只取扫描与播放要用的字段。"""

    fid: str
    cid: str
    name: str
    size: int = 0
    sha1: str = ""
    pick_code: str = ""
    play_long: int = 0
    is_dir: bool = False
    thumb: str = ""


def _parse_file(item: dict[str, Any]) -> Open115File:
    """容错解析一项目录项：字段名以阶段 0 原型实测为准，这里先按文档摘要取。"""
    is_dir = bool(item.get("is_dir")) or item.get("type") in ("dir", "folder", "directory")
    if not is_dir and not item.get("pick_code") and not item.get("sha1"):
        # 没有 pick_code 也没有 sha1 的项大概率是目录；有实测字段后再收紧。
        is_dir = item.get("fc") is not None or "file_count" in item
    return Open115File(
        fid=str(item.get("fid") or item.get("file_id") or ""),
        cid=str(item.get("cid") or item.get("parent_cid") or item.get("pid") or ""),
        name=str(item.get("name") or item.get("file_name") or ""),
        size=int(item.get("size") or item.get("fs") or 0),
        sha1=str(item.get("sha1") or ""),
        pick_code=str(item.get("pick_code") or ""),
        play_long=int(item.get("play_long") or 0),
        is_dir=is_dir,
        thumb=str(item.get("thumb") or ""),
    )


def windows_ledger_path(root_prefix: str, *relative: str) -> str:
    """拼账本路径：保持 Windows 形态，由 ``platform.py`` 读取转换，绝不写 POSIX。"""
    return str(PureWindowsPath(root_prefix, *relative))


def open115_file_to_ledger_row(root_prefix: str, relative: Iterable[str],
                               item: Open115File) -> dict[str, Any]:
    """115 文件 → 账本行草稿：``asset.path`` 是 Windows 形态，fid/pick_code/cid 另存。"""
    return {
        "location": "115",
        "path": windows_ledger_path(root_prefix, *relative, item.name),
        "fid": item.fid,
        "pick_code": item.pick_code,
        "cid": item.cid,
        "size": item.size,
        "sha1": item.sha1,
        "play_long": item.play_long,
    }


class Open115Client:
    """115 Open API 客户端。``transport`` 可注入，便于测试用 mock 响应。"""

    def __init__(self, credentials: Open115AppCredentials, *,
                 transport: Any = None, now: Callable[[], float] | None = None) -> None:
        self.credentials = credentials
        self._transport = transport
        self._now = now or time.time

    def _http(self) -> Any:
        if self._transport is not None:
            return self._transport
        # 外网客户端必须走 Peach 代理设置（test_outbound_proxy_policy）：
        # 用户在配置页选直连 / 跟随系统 / 自定义代理时，115 请求跟同一选择走。
        from . import peach_proxy
        return peach_proxy.http_client(timeout=30.0)

    def _post(self, url: str, payload: dict[str, Any],
              headers: dict[str, str] | None = None) -> dict[str, Any]:
        transport = self._http()
        try:
            response = transport.post(url, json=payload, headers=headers or {})
        except Exception as error:  # noqa: BLE001 - 网络异常统一转中文
            raise Open115Error("network", "连不上 115，请检查网络后重试") from error
        return self._check(response)

    def _get(self, url: str, params: dict[str, Any] | None = None,
             headers: dict[str, str] | None = None) -> dict[str, Any]:
        transport = self._http()
        try:
            response = transport.get(url, params=params or {}, headers=headers or {})
        except Exception as error:  # noqa: BLE001 - 网络异常统一转中文
            raise Open115Error("network", "连不上 115，请检查网络后重试") from error
        return self._check(response)

    @staticmethod
    def _check(response: Any) -> dict[str, Any]:
        status = int(getattr(response, "status_code", 200))
        try:
            payload = response.json()
        except Exception:  # noqa: BLE001 - 非 JSON 响应按状态码处理
            payload = {}
        if status >= 400:
            raise chinese_error(status, payload)
        if isinstance(payload, dict) and payload.get("state") is False:
            raise chinese_error(status, payload)
        return payload if isinstance(payload, dict) else {}

    def _require_app(self) -> None:
        if not self.credentials.configured:
            raise Open115Error("not_configured", "115 开发者应用未配置，请先在部署里填好 AppID 与 AppSecret")

    def start_qrcode(self) -> dict[str, Any]:
        """``POST /open/qrcode/token``：生成 PKCE 对，返回 uid 与二维码（字段待实测）。"""
        self._require_app()
        verifier, challenge = generate_pkce_pair()
        payload = self._post(f"{PASSPORT_BASE}/open/qrcode/token", {
            "app_id": self.credentials.app_id,
            "code_verifier": verifier,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
        })
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        uid = str(data.get("uid") or data.get("qrcode_id") or "")
        qrcode = str(data.get("qrcode") or data.get("qr_code") or data.get("url") or "")
        if not uid:
            raise Open115Error("network", "115 没有返回扫码会话，请重试")
        return {"uid": uid, "qrcode": qrcode, "code_verifier": verifier,
                "expires_in": QRCODE_TTL_SECONDS}

    def check_qrcode(self, uid: str) -> dict[str, Any]:
        """``POST /open/qrcode/status``：轮询扫码状态；status=2 表示已扫码拿到 code。"""
        self._require_app()
        payload = self._post(f"{PASSPORT_BASE}/open/qrcode/status", {
            "app_id": self.credentials.app_id, "uid": uid,
        })
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        return {"status": int(data.get("status") or 0),
                "code": str(data.get("code") or data.get("auth_code") or ""),
                "message": str(data.get("message") or "")}

    def exchange_code(self, code: str, verifier: str) -> TokenSet:
        """``POST /open/authCodeToToken``：授权码换 token。"""
        self._require_app()
        payload = self._post(f"{PASSPORT_BASE}/open/authCodeToToken", {
            "app_id": self.credentials.app_id,
            "app_secret": self.credentials.app_secret,
            "code": code,
            "code_verifier": verifier,
        })
        return self._token_from_payload(payload)

    def refresh(self, refresh_token: str, *, force: bool = False,
                last_refresh_at: float | None = None) -> TokenSet:
        """``POST /open/refreshToken``：刷新间隔不得小于 2 小时，refresh_token 1 年不延长。"""
        self._require_app()
        now = self._now()
        if not force and last_refresh_at is not None:
            if now - last_refresh_at < MIN_REFRESH_INTERVAL_SECONDS:
                raise Open115Error(
                    "rate_limited", "115 token 刷新太频繁，请至少间隔 2 小时再刷新")
        payload = self._post(f"{PASSPORT_BASE}/open/refreshToken", {
            "app_id": self.credentials.app_id,
            "app_secret": self.credentials.app_secret,
            "refresh_token": refresh_token,
        })
        return self._token_from_payload(payload)

    def _token_from_payload(self, payload: dict[str, Any]) -> TokenSet:
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        now = self._now()
        expires_in = data.get("expires_in")
        refresh_expires_in = data.get("refresh_expires_in")
        return TokenSet(
            access_token=str(data.get("access_token") or ""),
            refresh_token=str(data.get("refresh_token") or ""),
            expires_at=(now + float(expires_in)) if expires_in else None,
            refresh_expires_at=(now + float(refresh_expires_in)) if refresh_expires_in else None,
            user_id=str(data.get("user_id") or data.get("uid") or ""),
            user_name=str(data.get("user_name") or data.get("nickname") or ""),
            vip_level=str(data.get("vip_level") or data.get("vip") or ""),
        )

    def _auth_headers(self, token: TokenSet) -> dict[str, str]:
        if not token.access_token:
            raise Open115Error("not_bound", "115 还没有绑定账号，请先扫码绑定")
        return {"Authorization": f"Bearer {token.access_token}"}

    def user_info(self, token: TokenSet) -> dict[str, Any]:
        """``GET /open/user/info``：读 VIP 与空间，只取展示要用的字段。"""
        payload = self._get(f"{PROAPI_BASE}/open/user/info",
                            headers=self._auth_headers(token))
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        return {"user_id": str(data.get("user_id") or data.get("uid") or token.user_id),
                "user_name": str(data.get("user_name") or data.get("nickname") or token.user_name),
                "vip_level": str(data.get("vip_level") or data.get("vip") or token.vip_level),
                "space_used": data.get("space_used") or data.get("used"),
                "space_total": data.get("space_total") or data.get("total")}

    def list_files(self, token: TokenSet, cid: str, *, limit: int = FILES_PAGE_SIZE,
                   offset: int = 0) -> list[Open115File]:
        """``GET /open/ufile/files``：按 cid 列一页；分页由调用方用 offset 推进。"""
        payload = self._get(f"{PROAPI_BASE}/open/ufile/files",
                            params={"cid": cid, "limit": limit, "offset": offset,
                                    "show_dir": 1},
                            headers=self._auth_headers(token))
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        items = data.get("files") or data.get("data") or []
        if isinstance(items, dict):
            items = list(items.values())
        return [_parse_file(item) for item in items if isinstance(item, dict)]

    def list_recursive(self, token: TokenSet, root_cid: str, *,
                       limit: int = FILES_PAGE_SIZE) -> list[Open115File]:
        """从根 cid 递归拉取全部子文件夹（广度优先）；无 webhook，只能靠轮询全量。"""
        found: list[Open115File] = []
        queue = [root_cid]
        seen_cids = set()
        while queue:
            cid = queue.pop(0)
            if cid in seen_cids:
                continue
            seen_cids.add(cid)
            offset = 0
            while True:
                page = self.list_files(token, cid, limit=limit, offset=offset)
                if not page:
                    break
                for item in page:
                    found.append(item)
                    if item.is_dir and item.fid:
                        queue.append(item.fid)
                if len(page) < limit:
                    break
                offset += len(page)
        return found

    def downurl(self, token: TokenSet, pick_code: str) -> str:
        """``POST /open/ufile/downurl``：pick_code 换原盘直链；每次点播现换，不存库。"""
        if not pick_code:
            raise Open115Error("not_bound", "这部片子没有可播放的直链标识，请重新扫描")
        payload = self._post(f"{PROAPI_BASE}/open/ufile/downurl",
                             {"pick_code": pick_code},
                             headers=self._auth_headers(token))
        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        url = str(data.get("url") or data.get("downurl") or data.get("download_url") or "")
        if not url:
            raise Open115Error("network", "115 没有返回可播放的直链，请重试")
        return url


@dataclass
class Open115Binding:
    """已绑账号与授权文件夹：只存展示与扫描要用的字段，不存 token 原值以外的凭据。"""

    bound: bool = False
    user_id: str = ""
    user_name: str = ""
    vip_level: str = ""
    token_set: bool = False
    token_expires_at: float | None = None
    root_cid: str = ""
    root_path: str = ""
    library_id: str = ""
    app_configured: bool = False

    def public(self) -> dict[str, Any]:
        return {
            "bound": self.bound,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "vip_level": self.vip_level,
            "token_set": self.token_set,
            "token_expires_at": self.token_expires_at,
            "root_cid": self.root_cid,
            "root_path": self.root_path,
            "library_id": self.library_id,
            "app_configured": self.app_configured,
        }


class Open115Store:
    """``secrets/open115.json`` 的读写：token 与绑定放一起，文件 0600，不写日志。"""

    FILENAME = "open115.json"

    def __init__(self, secrets_dir: Path) -> None:
        self.secrets_dir = Path(secrets_dir)
        self.path = self.secrets_dir / self.FILENAME

    def _read(self) -> dict[str, Any]:
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return {}
        return data if isinstance(data, dict) else {}

    def _write(self, data: dict[str, Any]) -> None:
        self.secrets_dir.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        try:
            os.chmod(self.path, 0o600)
        except OSError:
            pass

    def load_token(self) -> TokenSet | None:
        data = self._read()
        token = data.get("token") or {}
        if not isinstance(token, dict) or not token.get("access_token"):
            return None
        return TokenSet(
            access_token=str(token["access_token"]),
            refresh_token=str(token.get("refresh_token") or ""),
            expires_at=token.get("expires_at"),
            refresh_expires_at=token.get("refresh_expires_at"),
            user_id=str(token.get("user_id") or ""),
            user_name=str(token.get("user_name") or ""),
            vip_level=str(token.get("vip_level") or ""),
        )

    def save_token(self, token: TokenSet, *, last_refresh_at: float | None = None) -> None:
        data = self._read()
        data["token"] = {
            "access_token": token.access_token,
            "refresh_token": token.refresh_token,
            "expires_at": token.expires_at,
            "refresh_expires_at": token.refresh_expires_at,
            "user_id": token.user_id,
            "user_name": token.user_name,
            "vip_level": token.vip_level,
        }
        if last_refresh_at is not None:
            data["last_refresh_at"] = last_refresh_at
        self._write(data)

    def last_refresh_at(self) -> float | None:
        value = self._read().get("last_refresh_at")
        return float(value) if isinstance(value, (int, float)) else None

    def save_pending(self, uid: str, verifier: str) -> None:
        data = self._read()
        data["pending"] = {"uid": uid, "code_verifier": verifier, "created_at": time.time()}
        self._write(data)

    def load_pending(self, uid: str) -> str | None:
        pending = self._read().get("pending") or {}
        if not isinstance(pending, dict) or pending.get("uid") != uid:
            return None
        return str(pending.get("code_verifier") or "")

    def clear_pending(self) -> None:
        data = self._read()
        data.pop("pending", None)
        self._write(data)

    def save_binding(self, *, root_cid: str, root_path: str, library_id: str = "") -> None:
        data = self._read()
        data["root_cid"] = root_cid
        data["root_path"] = root_path
        data["library_id"] = library_id
        self._write(data)

    def binding(self, *, app_configured: bool = False) -> Open115Binding:
        data = self._read()
        token = data.get("token") or {}
        return Open115Binding(
            bound=bool(token.get("access_token")),
            user_id=str(token.get("user_id") or ""),
            user_name=str(token.get("user_name") or ""),
            vip_level=str(token.get("vip_level") or ""),
            token_set=bool(token.get("access_token")),
            token_expires_at=token.get("expires_at"),
            root_cid=str(data.get("root_cid") or ""),
            root_path=str(data.get("root_path") or ""),
            library_id=str(data.get("library_id") or ""),
            app_configured=app_configured,
        )

    def disconnect(self) -> None:
        """断开绑定：清 token 与授权文件夹，应用凭据在环境变量里，不受影响。"""
        data = self._read()
        data.pop("token", None)
        data.pop("pending", None)
        data.pop("root_cid", None)
        data.pop("root_path", None)
        data.pop("library_id", None)
        data.pop("last_refresh_at", None)
        self._write(data)

    def refresh_if_needed(self, client: Open115Client) -> TokenSet | None:
        """token 过期时自动刷新（间隔 ≥2 小时）；未过期或未绑定时返回现有 token。"""
        token = self.load_token()
        if token is None:
            return None
        if not token.access_expired:
            return token
        if not token.refresh_token:
            raise Open115Error("unauthorized", "115 登录已过期，请重新扫码绑定")
        refreshed = client.refresh(token.refresh_token,
                                   last_refresh_at=self.last_refresh_at())
        merged = TokenSet(
            access_token=refreshed.access_token or token.access_token,
            refresh_token=refreshed.refresh_token or token.refresh_token,
            expires_at=refreshed.expires_at,
            refresh_expires_at=refreshed.refresh_expires_at or token.refresh_expires_at,
            user_id=refreshed.user_id or token.user_id,
            user_name=refreshed.user_name or token.user_name,
            vip_level=refreshed.vip_level or token.vip_level,
        )
        self.save_token(merged, last_refresh_at=time.time())
        return merged
