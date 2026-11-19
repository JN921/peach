"""115 Open 客户端骨架的隔离回归：PKCE、刷新间隔、错误映射、递归分页与 token 存储。

全部用 mock 的 115 响应，不调真实接口、不写真实 ledger、不碰生产 NAS。
"""
import base64
import hashlib
import os
import stat
import tempfile
import unittest
import uuid
from pathlib import Path
from unittest.mock import patch

from peach.open115 import (
    Open115AppCredentials, Open115Client, Open115Error, Open115Store, TokenSet,
    app_credentials_from_env, chinese_error, generate_pkce_pair,
    open115_file_to_ledger_row, windows_ledger_path,
)
from peach.open115 import Open115File


class FakeResponse:
    def __init__(self, status: int, payload: dict) -> None:
        self.status_code = status
        self._payload = payload

    def json(self) -> dict:
        return self._payload


class FakeTransport:
    """按 (方法, 路径后缀) 分发 mock 响应，并记下每次调用。"""

    def __init__(self) -> None:
        self.calls: list[tuple[str, str, dict]] = []
        self.handlers: dict[tuple[str, str], FakeResponse] = {}

    def on(self, method: str, suffix: str, response: FakeResponse) -> None:
        self.handlers[(method, suffix)] = response

    def _dispatch(self, method: str, url: str, payload: dict) -> FakeResponse:
        self.calls.append((method, url, payload))
        for (held_method, suffix), response in self.handlers.items():
            if held_method == method and url.endswith(suffix):
                return response
        raise AssertionError(f"未登记的 mock 调用：{method} {url}")

    def post(self, url: str, json: dict | None = None, headers: dict | None = None) -> FakeResponse:
        return self._dispatch("POST", url, json or {})

    def get(self, url: str, params: dict | None = None, headers: dict | None = None) -> FakeResponse:
        return self._dispatch("GET", url, params or {})


def client_with(transport: FakeTransport, *, now: float = 1_000_000.0) -> Open115Client:
    return Open115Client(Open115AppCredentials("app-1", "secret-1"),
                         transport=transport, now=lambda: now)


class PkceTests(unittest.TestCase):
    def test_verifier_length_and_challenge(self):
        verifier, challenge = generate_pkce_pair()
        self.assertTrue(43 <= len(verifier) <= 128)
        self.assertNotIn("=", verifier)
        self.assertNotIn("+", verifier)
        self.assertNotIn("/", verifier)
        expected = base64.urlsafe_b64encode(
            hashlib.sha256(verifier.encode("ascii")).digest()).rstrip(b"=").decode("ascii")
        self.assertEqual(challenge, expected)


class ErrorMappingTests(unittest.TestCase):
    def test_401_is_unauthorized_in_chinese(self):
        error = chinese_error(401, {})
        self.assertEqual(error.kind, "unauthorized")
        self.assertIn("重新扫码", error.message)
        self.assertNotIn("401", error.message)

    def test_429_is_rate_limited(self):
        self.assertEqual(chinese_error(429, {}).kind, "rate_limited")

    def test_500_is_network(self):
        self.assertEqual(chinese_error(500, {}).kind, "network")


class QrcodeFlowTests(unittest.TestCase):
    def test_start_and_exchange(self):
        transport = FakeTransport()
        transport.on("POST", "/open/qrcode/token", FakeResponse(200, {
            "data": {"uid": "u-1", "qrcode": "data:image/png;base64,AAA"}}))
        transport.on("POST", "/open/qrcode/status", FakeResponse(200, {
            "data": {"status": 2, "code": "code-1"}}))
        transport.on("POST", "/open/authCodeToToken", FakeResponse(200, {
            "data": {"access_token": "a-1", "refresh_token": "r-1",
                     "expires_in": 7200, "user_id": "u-9"}}))
        client = client_with(transport)
        started = client.start_qrcode()
        self.assertEqual(started["uid"], "u-1")
        self.assertTrue(started["qrcode"].startswith("data:image/png"))
        self.assertEqual(len(started["code_verifier"]), len(generate_pkce_pair()[0]))
        checked = client.check_qrcode("u-1")
        self.assertEqual((checked["status"], checked["code"]), (2, "code-1"))
        token = client.exchange_code("code-1", started["code_verifier"])
        self.assertEqual(token.access_token, "a-1")
        self.assertEqual(token.expires_at, 1_000_000.0 + 7200)
        self.assertEqual(token.user_id, "u-9")
        # 请求确实打到了 passportapi 域名，而不是 proapi。
        self.assertTrue(all("passportapi.115.com" in url for _, url, _ in transport.calls))

    def test_start_without_app_credentials(self):
        client = Open115Client(Open115AppCredentials("", ""), transport=FakeTransport())
        with self.assertRaises(Open115Error) as caught:
            client.start_qrcode()
        self.assertEqual(caught.exception.kind, "not_configured")


class RefreshTests(unittest.TestCase):
    def test_refresh_too_soon_is_blocked(self):
        transport = FakeTransport()
        transport.on("POST", "/open/refreshToken", FakeResponse(200, {
            "data": {"access_token": "a-2", "refresh_token": "r-2"}}))
        client = client_with(transport)
        with self.assertRaises(Open115Error) as caught:
            client.refresh("r-1", last_refresh_at=1_000_000.0 - 60)
        self.assertEqual(caught.exception.kind, "rate_limited")
        self.assertEqual(transport.calls, [])

    def test_refresh_after_two_hours(self):
        transport = FakeTransport()
        transport.on("POST", "/open/refreshToken", FakeResponse(200, {
            "data": {"access_token": "a-2", "refresh_token": "r-2", "expires_in": 3600}}))
        client = client_with(transport)
        token = client.refresh("r-1", last_refresh_at=1_000_000.0 - 2 * 3600 - 1)
        self.assertEqual(token.access_token, "a-2")
        self.assertEqual(token.expires_at, 1_000_000.0 + 3600)


class RecursiveListTests(unittest.TestCase):
    def test_recursive_pagination_and_subfolders(self):
        def files(url: str, params: dict) -> FakeResponse:
            cid, offset = params["cid"], params["offset"]
            if cid == "0" and offset == 0:
                return FakeResponse(200, {"data": {"files": [
                    {"fid": "10", "name": "电影", "is_dir": True},
                    {"fid": "f1", "name": "a.mp4", "pick_code": "p1",
                     "size": 100, "sha1": "s1", "play_long": 60}]}})
            if cid == "10" and offset == 0:
                return FakeResponse(200, {"data": {"files": [
                    {"fid": "f2", "name": "b.mp4", "pick_code": "p2", "size": 200},
                    {"fid": "f3", "name": "c.mp4", "pick_code": "p3", "size": 300}]}})
            if cid == "10" and offset == 2:
                return FakeResponse(200, {"data": {"files": [
                    {"fid": "f4", "name": "d.avi", "pick_code": "p4", "size": 400}]}})
            return FakeResponse(200, {"data": {"files": []}})

        class PagedTransport(FakeTransport):
            def get(self, url, params=None, headers=None):
                self.calls.append(("GET", url, params or {}))
                return files(url, params or {})

        client = client_with(PagedTransport())
        token = TokenSet("a-1", "r-1")
        found = client.list_recursive(token, "0", limit=2)
        names = sorted(item.name for item in found)
        self.assertEqual(names, ["a.mp4", "b.mp4", "c.mp4", "d.avi", "电影"])
        self.assertEqual(sorted(item.name for item in found if item.is_dir), ["电影"])

    def test_downurl_and_missing_pick_code(self):
        transport = FakeTransport()
        transport.on("POST", "/open/ufile/downurl", FakeResponse(200, {
            "data": {"url": "https://example.invalid/f.mp4"}}))
        client = client_with(transport)
        self.assertEqual(client.downurl(TokenSet("a-1"), "p1"), "https://example.invalid/f.mp4")
        with self.assertRaises(Open115Error):
            client.downurl(TokenSet("a-1"), "")


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.secrets = Path(self.temporary.name) / "secrets"
        self.store = Open115Store(self.secrets)

    def test_round_trip_and_public_hides_tokens(self):
        token = TokenSet("a-1", "r-1", expires_at=123.0, user_id="u-9",
                         user_name="阿九", vip_level="年费")
        self.store.save_token(token)
        loaded = self.store.load_token()
        self.assertIsNotNone(loaded)
        assert loaded is not None
        self.assertEqual((loaded.access_token, loaded.refresh_token), ("a-1", "r-1"))
        self.assertEqual(stat.S_IMODE(self.store.path.stat().st_mode), 0o600)
        public = self.store.binding(app_configured=True).public()
        self.assertTrue(public["bound"])
        self.assertEqual(public["user_name"], "阿九")
        self.assertNotIn("access_token", public)
        self.assertNotIn("refresh_token", public)
        self.assertNotIn("access_token", str(self.store.binding().public()))

    def test_pending_verifier_round_trip(self):
        self.store.save_pending("u-1", "verifier-1")
        self.assertEqual(self.store.load_pending("u-1"), "verifier-1")
        self.assertIsNone(self.store.load_pending("u-2"))
        self.store.clear_pending()
        self.assertIsNone(self.store.load_pending("u-1"))

    def test_disconnect_clears_token_and_binding(self):
        self.store.save_token(TokenSet("a-1", "r-1"))
        self.store.save_binding(root_cid="10", root_path="/电影")
        self.store.disconnect()
        self.assertIsNone(self.store.load_token())
        self.assertFalse(self.store.binding().bound)
        self.assertEqual(self.store.binding().root_cid, "")

    def test_refresh_if_needed_only_when_expired(self):
        import time as _time
        transport = FakeTransport()
        transport.on("POST", "/open/refreshToken", FakeResponse(200, {
            "data": {"access_token": "a-2", "refresh_token": "r-2", "expires_in": 3600}}))
        client = Open115Client(Open115AppCredentials("app-1", "secret-1"),
                               transport=transport, now=lambda: 1_000_000.0)
        fresh = TokenSet("a-1", "r-1", expires_at=_time.time() + 3600)
        self.store.save_token(fresh)
        self.assertEqual(self.store.refresh_if_needed(client).access_token, "a-1")
        self.assertEqual(transport.calls, [])
        expired = TokenSet("a-1", "r-1", expires_at=_time.time() - 10, user_id="u-9")
        self.store.save_token(expired)
        refreshed = self.store.refresh_if_needed(client)
        self.assertIsNotNone(refreshed)
        assert refreshed is not None
        self.assertEqual(refreshed.access_token, "a-2")
        self.assertEqual(refreshed.refresh_token, "r-2")
        # 刷新后旧 user_id 保留（新 token 没带时不丢）。
        self.assertEqual(refreshed.user_id, "u-9")

    def test_app_credentials_from_env(self):
        with patch.dict(os.environ, {"PEACH_115_APP_ID": "id-1",
                                     "PEACH_115_APP_SECRET": "s-1"}, clear=False):
            creds = app_credentials_from_env()
            self.assertTrue(creds.configured)
        with patch.dict(os.environ, {}, clear=True):
            self.assertFalse(app_credentials_from_env().configured)


class LedgerPathTests(unittest.TestCase):
    def test_windows_ledger_path_stays_windows_form(self):
        path = windows_ledger_path("R:\\115", "电影", "a.mp4")
        self.assertEqual(path, "R:\\115\\电影\\a.mp4")
        self.assertNotIn("/", path)

    def test_file_to_ledger_row_keeps_ids_separate(self):
        item = Open115File(fid="f1", cid="10", name="a.mp4", size=100,
                           sha1="s1", pick_code="p1", play_long=60)
        row = open115_file_to_ledger_row("R:\\115", ["电影"], item)
        self.assertEqual(row["location"], "115")
        self.assertEqual(row["path"], "R:\\115\\电影\\a.mp4")
        self.assertEqual(row["pick_code"], "p1")
        self.assertEqual(row["fid"], "f1")


class MediaConfigurationOpen115Tests(unittest.TestCase):
    def test_open115_row_skips_local_path_validation(self):
        from peach import media_configuration as media_config
        rows = [{"location": "115", "path": "", "root": "R:\\115",
                 "transport": "open115", "cost": "metered",
                 "library": "115", "library_id": str(uuid.uuid4())}]
        locations, mounts, problems = media_config.validate(rows, windows=False, config=None)
        self.assertEqual(problems, [])
        self.assertEqual(locations, {"115": ("R:\\115",)})
        self.assertEqual(mounts, {})

    def test_local_row_still_requires_a_path(self):
        from peach import media_configuration as media_config
        rows = [{"location": "local", "path": "", "root": "",
                 "transport": "filesystem", "cost": "free"}]
        _locations, _mounts, problems = media_config.validate(rows, windows=False, config=None)
        self.assertTrue(any(problems))

    def test_configure_sources_keeps_open115_transport(self):
        from peach import media_identity, settings_file
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name).resolve()
        config = settings_file.PeachConfig(root, root / "config.toml", present=True)
        library_id = str(uuid.uuid4())
        rows = [{"location": "115", "path": "", "root": "R:\\115",
                 "transport": "open115", "cost": "metered",
                 "library": "115", "library_id": library_id}]
        prepared = media_identity.configure_sources(config, rows, windows=False)
        self.assertEqual(prepared.locations, {"115": ("R:\\115",)})
        stored = [value for value in prepared.storage_roots.values()]
        self.assertTrue(stored)
        self.assertEqual(stored[0].get("transport"), "open115")


class SnapshotTests(unittest.TestCase):
    def test_snapshot_open115_section_hides_tokens(self):
        from peach.routes_configuration import open115_snapshot
        from peach.settings_file import PeachConfig
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name).resolve()
        config = PeachConfig(root, root / "config.toml", present=True)
        store = Open115Store(config.directory("secrets"))
        store.save_token(TokenSet("a-1", "r-1", user_id="u-9"))
        with patch.dict(os.environ, {}, clear=True):
            result = open115_snapshot(config)
        self.assertTrue(result["bound"])
        self.assertEqual(result["user_id"], "u-9")
        self.assertFalse(result["app_configured"])
        self.assertNotIn("access_token", result)


if __name__ == "__main__":
    unittest.main()
