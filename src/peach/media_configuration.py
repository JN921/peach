"""媒体来源表单与配置映射；来源 ID 直接沿用扫描及流量策略。"""
from __future__ import annotations

from concurrent.futures import Future, TimeoutError as FuturesTimeout
from pathlib import Path, PurePath, PureWindowsPath, PurePosixPath
import hashlib
import shutil
import sys
import threading
from typing import Any

from . import platform, media_identity
from .media_sources import SOURCE_OPTIONS, cost_for


def _windows_installed_names() -> list[str]:
    """从 Windows 安装清单读取软件名称，不读取命令、账户或凭据。"""
    if sys.platform != "win32":
        return []
    import winreg
    names = []
    for hive in (winreg.HKEY_LOCAL_MACHINE, winreg.HKEY_CURRENT_USER):
        for view in (winreg.KEY_WOW64_64KEY, winreg.KEY_WOW64_32KEY):
            try:
                with winreg.OpenKey(hive, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
                                    0, winreg.KEY_READ | view) as key:
                    for index in range(winreg.QueryInfoKey(key)[0]):
                        try:
                            with winreg.OpenKey(key, winreg.EnumKey(key, index)) as child:
                                names.append(str(winreg.QueryValueEx(child, "DisplayName")[0]).lower())
                        except OSError:
                            continue
            except OSError:
                continue
    return names


def mount_dependencies(*, system: str | None = None) -> list[dict[str, Any]]:
    """安装证据与挂载在线状态分别检测；只返回当前操作系统需要的依赖。"""
    system = system or sys.platform
    if system == "win32":
        names = _windows_installed_names()
        cloud = any(name.startswith("clouddrive") for name in names)
        driver, installed, url = "WinFsp", any(name.startswith("winfsp") for name in names), "https://winfsp.dev/rel/"
    elif system == "darwin":
        cloud = any((base / app).is_dir() for base in (Path("/Applications"), Path.home() / "Applications")
                    for app in ("CloudDrive.app", "CloudDrive2.app"))
        driver, installed, url = "macFUSE", Path("/Library/Filesystems/macfuse.fs").is_dir(), "https://macfuse.github.io/"
    else:
        return []
    cloud = cloud or any(shutil.which(name) for name in ("clouddrive", "clouddrive2", "CloudDrive"))
    return [{"name": "CloudDrive", "available": bool(cloud), "download_url": "https://www.clouddrive2.com/download.html"},
            {"name": driver, "available": installed, "download_url": url}]


def rows(config, *, windows: bool, probe: bool = False, known: dict | None = None) -> list[dict[str, Any]]:
    """设置页的媒体目录行。`known` 是挂载可达性快照（`reachability_states`）：

    快照里有的根直接用快照，网盘卡住时页面不再跟着等；快照里没有的（刚保存、服务还没
    重载）才现场探测，最多等 `PROBE_TIMEOUT` 秒，到时报未检测。
    """
    result = []
    libraries, stored = media_identity.catalog(config)
    for location, roots in config.locations.items():
        mounts = config.mounts.get(location, ())
        for index, root in enumerate(roots):
            mount = (mounts[index] if index < len(mounts) and mounts[index] else root if windows else "")
            identity = next(((key, value) for key, value in stored.items()
                             if media_identity.path_key(value["root"]) == media_identity.path_key(root)), None)
            root_id, value = identity
            library = libraries[value["library_id"]]
            smb_fields = {}
            if value.get('transport') == 'smb':
                from .smb_media import credential_store
                credential = credential_store(config).load('smb-' + root_id)
                secrets = credential.values if credential else {}
                smb_fields = dict(smb_username=secrets.get('username', ''),
                                  smb_password_saved=bool(secrets.get('password')),
                                  smb_encrypt=secrets.get('encrypt') == 'true')
            # 115 Open 行没有本机挂载：在线状态按 API 可达性判（配置页 115 卡片），
            # 这里不拿 scandir 探，不把“未检测”报成离线。
            online = None if value.get('transport') == 'open115' else _online(
                root, root_id, mount, probe, config, known)
            result.append({"location": location, "root": root, "path": mount,
                           "root_id": root_id, "library_id": value["library_id"],
                           "library": library["name"], "library_icon": library.get("icon", ""),
                           "library_color": library.get("color", ""),
                           "library_policy": library.get("policy", "") or "auto",
                           "library_stages": library.get("stages", ""),
                           "cost": cost_for(location, root, config),
                           "transport": value.get('transport', 'filesystem'),
                           "online": online, **smb_fields})
    return result


def reachability_states(reachability) -> dict[str, bool | None]:
    """可达性快照按根 ID 与路径键各记一份：True 在线、False 离线、None 探测未返回。

    服务刚启动、快照还在检测的根不记，交给 `_online` 现场探测（有时限）；探测已经超时的
    记 None，不再陪它等。
    """
    states: dict[str, bool | None] = {}
    if reachability is None:
        return states
    for source in reachability.sources():
        for root in source["roots"]:
            if root["online"] is None and root.get("state") != "timeout":
                continue
            if root.get("root_id"):
                states["id:" + root["root_id"]] = root["online"]
            states["path:" + media_identity.path_key(root["declared"])] = root["online"]
    return states


def _online(root, root_id, mount, probe, config, known):
    if not probe or not mount:
        return False
    for key in ("id:" + root_id if root_id else "", "path:" + media_identity.path_key(root)):
        if known and key in known:
            return known[key]
    from .smb_media import resolve
    resource = resolve(root, config)
    return _bounded_online(resource if resource is not None else Path(mount))


_PROBES: dict[str, Future] = {}
_PROBES_LOCK = threading.Lock()


def _bounded_online(target) -> bool | None:
    """现场探测一个根，最多等 `PROBE_TIMEOUT` 秒；同一个根上一次还没返回时不另起线程。"""
    from .mount_reachability import PROBE_TIMEOUT
    key = str(target)
    with _PROBES_LOCK:
        future = _PROBES.get(key)
        if future is None or future.done():
            future = _PROBES[key] = Future()

            def read(pending=future):
                try:
                    pending.set_result(platform.root_status(target) == "ok")
                except Exception:  # noqa: BLE001 - 未知异常不当作离线证据，报未检测
                    pending.set_result(None)
            threading.Thread(target=read, name="PeachMountProbe", daemon=True).start()
    try:
        return future.result(timeout=PROBE_TIMEOUT)
    except FuturesTimeout:
        return None


def _automatic_root(location: str, path: str, used: list[PureWindowsPath]) -> str:
    # 媒体来源和目录决定内部路径；已有路径占用时改用其他盘符，避免不同目录共用前缀。
    token = hashlib.sha256(f"{location}\0{PurePosixPath(path)}".encode()).hexdigest()[:32]
    drives = dict.fromkeys(["R:", *(f"{chr(code)}:" for code in range(65, 91))])
    for drive in drives:
        candidate = PureWindowsPath(drive + "\\", "peach", location, token)
        if not any(media_identity.overlaps(candidate, other) for other in used):
            return str(candidate)
    return ""


def _prepare_source(row: dict, existing: list[dict], used: list[PureWindowsPath]) -> None:
    location = row.get("location")
    if not isinstance(location, str) or location not in dict(SOURCE_OPTIONS):
        return
    path = str(row.get("path", "")).strip()
    matches = [previous for previous in existing
               if previous["location"] == location and previous["path"]
               and PurePosixPath(previous["path"]) == PurePosixPath(path)]
    row["root"] = matches[0]["root"] if len(matches) == 1 else _automatic_root(location, path, used)
    if not row.get("library"):
        row["library"] = (matches[0]["library"] if len(matches) == 1 and "library" not in row
                          else PurePosixPath(path).name or dict(SOURCE_OPTIONS)[location])
    if row["root"]:
        used.append(PureWindowsPath(row["root"]))


def prepare_sources(raws: object, *, windows: bool, config=None) -> object:
    """为非 Windows 表单补齐内部路径，保留已配置目录和显式填写的值；不读取或改写数据库。"""
    if not isinstance(raws, list) or not 1 <= len(raws) <= 100:
        return raws
    result = [dict(row) if isinstance(row, dict) else row for row in raws]
    existing = rows(config, windows=windows) if config is not None else []
    reserved = [row["root"] for row in existing] if config is not None and (config.present or config.mounts) else []
    reserved += [str(row.get("root", "")).strip() for row in result if isinstance(row, dict)]
    used = [PureWindowsPath(root) for root in reserved if platform.is_windows_path(root)]
    for row in result:
        if not isinstance(row, dict) or str(row.get("root", "")).strip():
            continue
        if row.get("transport") == "open115":
            # 115 Open 行没有本地路径可补：根前缀在绑定文件夹时已定，不走本地路径推断。
            continue
        from .smb_media import is_address
        if windows and not is_address(row.get('path')):
            continue
        _prepare_source(row, existing, used)
    return result


def _validated_open115_paths(row: dict) -> tuple[PureWindowsPath, PurePath]:
    """115 Open 行：只校验账本根前缀是 Windows 形态，不校验本地路径存在性，
    也不做 scandir；本机路径用按根前缀唯一的虚拟哨兵，只用于行间去重比较。"""
    root = str(row.get("root") or "").strip()
    if not platform.is_windows_path(root) or ".." in PureWindowsPath(root).parts:
        raise ValueError("115 Open 目录的内部路径无效，请使用 Windows 格式，例如 R:\\115")
    declared = PureWindowsPath(root)
    sentinel = PurePosixPath("/open115/" + str(declared).replace("\\", "/").replace(":", ""))
    return declared, sentinel


def _validated_paths(row: dict, *, windows: bool) -> tuple[PureWindowsPath, PurePath]:
    """取得数据库路径前缀与本机实际目录，用于检查重复和包含关系。"""
    if row.get('transport') == 'open115':
        return _validated_open115_paths(row)
    text = str(row.get("path", "")).strip()
    from .smb_media import is_address, canonical
    if row.get('transport') == 'smb' and not is_address(text):
        raise ValueError('请填写 smb://服务器/共享/目录')
    if is_address(text):
        text = canonical(text)
        row['path'] = text
        if any(not isinstance(row.get(key, ''), str) for key in ('smb_username', 'smb_password')):
            raise ValueError('SMB 账号和密码必须是文字')
        if any(key in row and not isinstance(row[key], bool) for key in ('smb_encrypt', 'smb_clear')):
            raise ValueError('SMB 连接选项无效')
        root = str(row.get('root', ''))
        if not platform.is_windows_path(root) or '..' in PureWindowsPath(root).parts:
            raise ValueError('SMB 目录的内部路径无效')
        return PureWindowsPath(root), PurePosixPath(text)
    root = str(row.get("root") or text).strip() if windows else str(row.get("root", "")).strip()
    if any(ord(char) < 32 for char in text + root):
        raise ValueError("路径不能包含控制字符")
    if not windows and not root:
        raise ValueError("无法自动配置媒体目录，请检查配置文件中的目录对应关系")
    if not platform.is_windows_path(root) or ".." in PureWindowsPath(root).parts:
        raise ValueError("媒体路径必须包含盘符，例如 B:\\；网络共享请先映射为 Windows 盘符" if windows
                         else "配置文件中 [media.locations] 的路径格式无效；请使用 Windows 格式，例如 R:\\media")
    path = PureWindowsPath(text) if windows else PurePosixPath(text)
    if not text or not (platform.is_windows_path(text) if windows else text.startswith("/")):
        raise ValueError("请填写媒体目录的完整路径，例如 D:\\Movies" if windows
                         else "请填写媒体目录的完整路径，例如 /media")
    if ".." in path.parts:
        raise ValueError("媒体目录路径不能包含上级目录 ..")
    return PureWindowsPath(root), path


def validate(raws: object, *, windows: bool, config=None) -> tuple[dict, dict, list[str]]:
    """离线来源允许保存；绝对路径、盘符根与来源间重叠在保存前校验。"""
    if not isinstance(raws, list) or not raws or len(raws) > 100:
        return {}, {}, ["请添加 1 到 100 个媒体目录"]
    raws = prepare_sources(raws, windows=windows, config=config)
    locations: dict[str, list[str]] = {}
    mounts: dict[str, list[str]] = {}
    errors = [""] * len(raws)
    seen: list[tuple[PureWindowsPath, PurePath]] = []
    for index, row in enumerate(raws):
        try:
            if not isinstance(row, dict):
                raise ValueError("媒体来源格式不正确")
            location = row.get("location")
            if not isinstance(location, str) or location not in dict(SOURCE_OPTIONS):
                raise ValueError("请选择列表中的媒体来源")
            if "cost" in row and row["cost"] not in ("free", "metered"):
                raise ValueError("请选择代理流量保护设置")
            declared, path = _validated_paths(row, windows=windows)
            for other_root, other_path in seen:
                if (declared == other_root or declared.is_relative_to(other_root)
                        or other_root.is_relative_to(declared)):
                    raise ValueError("媒体路径与另一文件夹重复或互相包含" if windows
                                     else "配置文件中的目录对应关系重复或互相包含")
                if path == other_path or path.is_relative_to(other_path) or other_path.is_relative_to(path):
                    raise ValueError("媒体目录与另一行重复或互相包含")
            seen.append((declared, path))
            locations.setdefault(location, []).append(str(declared))
            from .smb_media import is_address
            if row.get('transport') == 'open115':
                # 115 Open 行没有本机挂载点，mounts 记空串，不把虚拟哨兵写进配置。
                mounts.setdefault(location, []).append("")
            else:
                mounts.setdefault(location, []).append(row['path'] if is_address(row['path'])
                                                        else str(path) if not windows or declared != path else "")
        except ValueError as exc:
            errors[index] = str(exc)
    return ({key: tuple(value) for key, value in locations.items()},
            {key: tuple(value) for key, value in mounts.items() if any(value)},
            errors if any(errors) else [])


def costs(raws: list[dict], config, *, windows: bool) -> dict[str, str]:
    """按数据库路径前缀保存已校验媒体行的读取策略。"""
    result = dict(getattr(config, "media_costs", {}))
    for row in raws:
        root = str(PureWindowsPath(row.get("root") or row["path"]))
        for previous in tuple(result):
            if PureWindowsPath(previous) == PureWindowsPath(root):
                del result[previous]
        result[root] = row.get("cost", cost_for(row["location"], root, config))
    return result
