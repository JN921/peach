/* `/api/configuration` 一次给齐的几组分区，画好时的结构从这份数据算出，记进本机，下次整页骨架照它排。
 * 只记结构（有没有这一块、几行、哪种表单），不记高度，也不记任何值。 */
import type { ConfigurationData } from '../bundle';
import { CLOUD_LOCATIONS } from '../../core/media-sources';
import type { DownloadsShape, MaintenanceShape, NetworkShape, Open115Shape } from '../../configuration-skeleton';

export function downloadsShape(data: ConfigurationData): DownloadsShape | null {
  const state = data.downloads;
  if (!state) return null;
  const sources = state.media_sources ?? [];
  return {
    cloud: sources.some(source => CLOUD_LOCATIONS.includes(source)),
    has115: sources.includes('115'),
    pikpak: sources.includes('pikpak'),
    pikpakRoots: state.pikpak_roots.length > 0,
    pikpakLoggedIn: state.pikpak.logged_in,
    browserLogin: state.pikpak_browser.available,
  };
}

export function open115Shape(data: ConfigurationData): Open115Shape | null {
  const state = data.open115;
  if (!state) return null;
  return {
    bound: state.bound,
    appConfigured: state.app_configured,
    rootBound: Boolean(state.root_cid),
  };
}

export function networkShape(data: ConfigurationData): NetworkShape {
  const tunnel = data.tunnel;
  return {
    port: Boolean(data.editable && data.port_editable !== false),
    addresses: data.network ? 1 + Number(Boolean(data.network.lan_url || data.network.ip_url))
      + Number(Boolean(data.network.lan_url && data.network.ip_url)) : 0,
    networkEditable: Boolean(data.network?.editable),
    lan: data.network?.host === '0.0.0.0',
    proxyAddress: data.peach_proxy?.mode === 'proxy' || Boolean(data.peach_proxy?.needs_selection),
    access: data.access?.mode ?? '',
    tunnelNamed: Boolean(tunnel?.named_available),
    tunnelNamedMode: Boolean(tunnel?.named_available && tunnel.mode === 'named'),
    tunnelNote: Boolean(tunnel && (!tunnel.available || tunnel.state === 'starting' || (tunnel.state === 'running' && tunnel.url))),
  };
}

export function maintenanceShape(data: ConfigurationData): MaintenanceShape {
  const updates = data.updates;
  const job = data.update_job?.state ?? 'idle';
  const quiet = !updates || (updates.state === 'unchecked' && !updates.checked_at && job === 'idle');
  const releaseNotes = (updates?.package_kind ? 1 : 0)
    + (quiet ? 0 : (updates?.checked_at ? 1 : 0) + (updates?.state === 'unchecked' ? 0 : 1) + (job !== 'idle' ? 1 : 0));
  const automatic = data.automatic_updates;
  const storage = data.storage;
  return {
    releaseFacts: updates?.package_kind ? 5 : 4,
    releaseNotes,
    autoUpdateHelp: Boolean(automatic && (!automatic.available || automatic.download_available)),
    startupNote: Boolean(data.startup?.message),
    desktopNote: Boolean(data.startup?.desktop_message),
    storageRows: storage?.usage?.categories.length ?? 0,
    storageNotes: storage && !storage.relocation.available ? 1 : 0,
    reporting: Boolean(data.remote_reporting),
    reportingIdle: Boolean(data.remote_reporting && !data.remote_reporting.available),
    sharing: Boolean(data.library_sharing),
    sharingNotice: Boolean(data.library_sharing?.notice),
    sharingIdle: Boolean(data.library_sharing && !data.library_sharing.available),
    facts: data.facts.map(fact => fact.term),
    uninstall: Boolean(data.uninstall),
    uninstallHelp: Boolean(data.uninstall?.available),
  };
}
