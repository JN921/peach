"""媒体库与存储根目录的持久身份；路径表是兼容投影。"""
from __future__ import annotations

import re
from dataclasses import replace
from pathlib import PureWindowsPath, PurePosixPath
from uuid import NAMESPACE_URL, UUID, uuid4, uuid5

#: 媒体库处理方式（ADR-0116）。`auto` 是默认值，配置里不写；`custom` 另存所选步骤。
POLICIES = ("auto", "local", "custom")
#: 处理步骤：读取视频信息、联网补资料、联网补封面、联网补人物图片、生成九宫格预览。
STAGES = ("probe", "metadata", "cover", "people", "preview")
_LOCAL_STAGES = frozenset({"probe", "preview"})
#: 来源色取界面强调色的键名；具体色值由界面按键名取，这里只校验写法。
_COLOR = re.compile(r"[a-z]{2,16}")


def path_key(path):
    return str(PureWindowsPath(path)).casefold()


def library_stages(library):
    """一个媒体库在处理时要做的步骤。自动补全全做，仅使用本地资料不联网，自定义按所选。"""
    policy = library.get("policy") or "auto"
    if policy == "local":
        return _LOCAL_STAGES
    if policy == "custom":
        return frozenset(stage for stage in library.get("stages", "").split(",") if stage in STAGES)
    return frozenset(STAGES)


def stages_by_root(config):
    """`{规范化账本前缀: 允许的步骤}`，处理流程按作品路径所属的根目录查。"""
    libraries, roots = catalog(config)
    return {path_key(value["root"]): library_stages(libraries.get(value["library_id"], {}))
            for value in roots.values()}


def _legacy_value(mapping, root, default=""):
    return next((value for key, value in mapping.items() if path_key(key) == path_key(root)), default)


def catalog(config):
    """已有身份直接读取；路径配置按同名分组执行确定性升级。"""
    if getattr(config, "storage_roots", None):
        return (dict(getattr(config, "library_catalog", {})),
                {key: dict(value) for key, value in config.storage_roots.items()})
    from .media_libraries import LIBRARY_ICONS
    groups, roots, libraries = {}, {}, {}
    for location, paths in config.locations.items():
        mounts = getattr(config, "mounts", {}).get(location, ())
        for index, path in enumerate(paths):
            root = str(path)
            name = _legacy_value(getattr(config, "library_names", {}), root) or PureWindowsPath(root).name or root
            groups.setdefault(name, []).append(root)
            root_id = str(uuid5(NAMESPACE_URL, "peach:storage-root:" + path_key(root)))
            roots[root_id] = dict(root=root, location=location,
                                  mount=str(mounts[index]) if index < len(mounts) else "",
                                  cost=_legacy_value(getattr(config, "media_costs", {}), root),
                                  library_id="")
    for name, paths in groups.items():
        library_id = str(uuid5(NAMESPACE_URL, "peach:library:" + "\0".join(sorted(path_key(p) for p in paths))))
        icon = next((_legacy_value(getattr(config, "library_icons", {}), p) for p in paths
                     if _legacy_value(getattr(config, "library_icons", {}), p)), "")
        libraries[library_id] = dict(name=name, icon=icon if icon in LIBRARY_ICONS else "")
        for value in roots.values():
            if value["root"] in paths:
                value["library_id"] = library_id
    return libraries, roots


def project(config, libraries=None, roots=None):
    """按根目录身份生成扫描、挂载、名称及成本兼容投影。"""
    if libraries is None:
        libraries, roots = catalog(config)
    locations, mounts, names, icons, costs = {}, {}, {}, {}, {}
    for value in roots.values():
        root, location = value["root"], value["location"]
        library = libraries[value["library_id"]]
        locations.setdefault(location, []).append(root)
        mounts.setdefault(location, []).append(value.get("mount", ""))
        names[root] = library["name"]
        if library.get("icon"):
            icons[root] = library["icon"]
        if value.get("cost"):
            costs[root] = value["cost"]
    return replace(config, library_catalog=libraries, storage_roots=roots,
                   locations={key: tuple(values) for key, values in locations.items()},
                   mounts={key: tuple(values) for key, values in mounts.items() if any(values)},
                   library_names=names, library_icons=icons, media_costs=costs)


def overlaps(first, second):
    """两个目录相同或互为父子。"""
    return first == second or first.is_relative_to(second) or second.is_relative_to(first)


def _validate_library(value):
    """媒体库名称为 1 到 80 个可见字符，图标为空或取自内置列表。"""
    from .media_libraries import LIBRARY_ICONS
    name = value.get("name", "")
    if not isinstance(name, str) or not name.strip() or len(name) > 80 or any(ord(c) < 32 for c in name):
        raise ValueError("媒体库名称请使用 1 到 80 个可见字符")
    if value.get("icon", "") not in ("", *LIBRARY_ICONS):
        raise ValueError("请选择列表中的媒体库图标")
    color = value.get("color", "")
    if color and not _COLOR.fullmatch(color):
        raise ValueError("请选择列表中的来源色")
    policy = value.get("policy", "")
    if policy not in ("", *POLICIES):
        raise ValueError("请选择列表中的处理方式")
    stages = [stage for stage in value.get("stages", "").split(",") if stage]
    if any(stage not in STAGES for stage in stages) or (stages and policy != "custom"):
        raise ValueError("处理步骤无效")


def validate_catalog(libraries, roots):
    """拒绝损坏身份、悬空归属及跨库重叠。"""
    from .platform import is_windows_path
    seen, mounted = [], []
    for key, value in libraries.items():
        UUID(key)
        _validate_library(value)
    for key, value in roots.items():
        UUID(key)
        if value.get("library_id") not in libraries:
            raise ValueError("存储根目录的媒体库不存在")
        path = PureWindowsPath(value.get("root", ""))
        if not is_windows_path(str(path)) or not path.is_absolute() or ".." in path.parts:
            raise ValueError("存储根目录必须使用完整 Windows 路径")
        if not value.get("location") or value.get("cost", "") not in ("", "free", "metered"):
            raise ValueError("存储根目录的来源或读取策略无效")
        if any(overlaps(path, other) for other in seen):
            raise ValueError("媒体路径与另一文件夹重复或互相包含")
        seen.append(path)
        mount = value.get("mount", "")
        actual = (PureWindowsPath(mount) if len(mount) > 1 and mount[1] == ":" else PurePosixPath(mount)) if mount else path
        from .smb_media import canonical
        smb = value.get('transport') == 'smb'
        if value.get('transport', 'filesystem') not in {'filesystem', 'smb', 'open115'}:
            raise ValueError('媒体连接方式无效')
        if smb:
            canonical(mount)
        if not smb and value.get('transport') != 'open115' and (not actual.is_absolute() or ".." in actual.parts):
            raise ValueError("挂载目录必须使用完整路径")
        if any(overlaps(actual, other) for other in mounted):
            raise ValueError("媒体目录与另一行重复或互相包含")
        mounted.append(actual)
    for index, actual in enumerate(mounted):
        if isinstance(actual, PureWindowsPath) and any(
                (index != other_index or actual != other) and overlaps(actual, other)
                for other_index, other in enumerate(seen)):
            raise ValueError("挂载目录与账本路径重叠，请使用独立目录")


def _match_root(row, root, previous, by_path, *, windows):
    """表单行认回既有根目录：显式 root_id 优先，否则按同一来源的账本前缀；认回的根核对来源、前缀和重定位意图。"""
    path = row["path"]
    supplied = str(row.get("root_id") or "")
    if supplied and supplied not in previous:
        raise ValueError("存储根目录已变更，请刷新配置")
    matched = by_path.get(path_key(root))
    # 只按路径认回同一来源的根；换了来源的同一前缀是另一个目录声明，取新身份。
    if matched and previous[matched]["location"] != row["location"]:
        matched = None
    old = previous.get(supplied or matched or "")
    if old:
        if row["location"] != old["location"] or path_key(root) != path_key(old["root"]):
            raise ValueError("已有根目录的来源和账本路径不可更换；请添加另一目录")
        old_path = old.get("mount") or (root if windows else "")
        equal = path_key(path) == path_key(old_path) if windows else path == old_path
        # 原来没有实际目录的根第一次填上目录，不算重定位。
        if old_path and not equal and row.get("change_mode") != "relocate":
            raise ValueError("请选择重定位此目录，或添加另一目录")
    return supplied or matched or str(uuid4()), old


def _library_value(row, known, name):
    """表单行里媒体库这一级的字段。来源色与处理方式只在设了时写进配置；表单没带的项沿用已保存的值。"""
    value = dict(name=name, icon=str(row.get("library_icon", known.get("icon", ""))))
    color = str(row.get("library_color", known.get("color", "")))
    policy = str(row.get("library_policy", known.get("policy", "")))
    if color:
        value["color"] = color
    if policy and policy != "auto":
        value["policy"] = policy
    if policy == "custom":
        chosen = str(row.get("library_stages", known.get("stages", ""))).split(",")
        if any(stage and stage not in STAGES for stage in chosen):
            raise ValueError("处理步骤无效")
        value["stages"] = ",".join(stage for stage in STAGES if stage in chosen)
    return value


def configure_sources(config, sources, *, windows):
    """更新根目录与媒体库；既有根的来源和账本前缀保持稳定。"""
    from .media_sources import cost_for
    libraries, previous = catalog(config)
    libraries = {key: dict(value) for key, value in libraries.items()}
    by_path = {path_key(value["root"]): key for key, value in previous.items()}
    roots, declared_libraries = {}, {}
    for row in sources:
        path = row["path"]
        root = str(PureWindowsPath(row.get("root") or path))
        root_id, old = _match_root(row, root, previous, by_path, windows=windows)
        if root_id in roots:
            raise ValueError("同一存储根目录不能登记多次")
        library_id = str(row.get("library_id") or (old or {}).get("library_id") or uuid4())
        UUID(library_id)
        name = str(row.get("library") or libraries.get(library_id, {}).get("name") or PureWindowsPath(root).name or root).strip()
        value = _library_value(row, libraries.get(library_id, {}), name)
        if library_id in declared_libraries and declared_libraries[library_id] != value:
            raise ValueError("同一媒体库的名称、图标、来源色和处理方式必须一致")
        declared_libraries[library_id] = value
        libraries[library_id] = value
        roots[root_id] = dict(root=root, location=row["location"], library_id=library_id,
                              mount=path if not windows or path_key(path) != path_key(root) else "",
                              cost=row.get("cost") or cost_for(row["location"], root, config))
        from .smb_media import is_address
        if is_address(path):
            roots[root_id]['transport'] = 'smb'
        elif row.get('transport') == 'open115':
            # 115 Open 行没有本机挂载：transport 留在根目录上，rows() 与扫描据此分流。
            roots[root_id]['transport'] = 'open115'
    # 不在表单来源列表里的扩展连接器仍由其专用设置维护。
    from .media_sources import SOURCE_OPTIONS
    roots.update({key: value for key, value in previous.items() if value["location"] not in dict(SOURCE_OPTIONS)})
    libraries = {key: value for key, value in libraries.items() if any(root["library_id"] == key for root in roots.values())}
    validate_catalog(libraries, roots)
    return project(config, libraries, roots)


def sources_for_paths(config, paths, *, windows, keep_other_sources=False):
    """路径式设置入口按已保存的实际目录接回根目录身份。"""
    from . import media_configuration
    existing = media_configuration.rows(config, windows=windows)
    sources = [dict(row) for row in existing if row["location"] != "local"] if keep_other_sources else []
    for path in paths:
        text = str(path)
        key = path_key(text) if windows else text
        match = next((row for row in existing if row["location"] == "local" and
                      (path_key(row["path"]) if windows else row["path"]) == key), None)
        sources.append(dict(match) if match else {"location": "local", "path": text})
    return media_configuration.prepare_sources(sources, windows=windows, config=config)


def ownership(config, path):
    """复用平台路径归属，将账本路径投影为稳定根目录和媒体库身份。"""
    from .platform import resolve_root
    location, index, _tail = resolve_root(path, config.locations)
    if location is None:
        return {}
    root = config.locations[location][index]
    _libraries, roots = catalog(config)
    return next((dict(root_id=key, library_id=value["library_id"]) for key, value in roots.items()
                 if path_key(value["root"]) == path_key(root)), {})
