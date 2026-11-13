/* 「115 Open（官方接口直连）」：设置页媒体分区附近的一块卡片。
 *
 * 前端只做展示和操作：扫码二维码由后端生成、只展示；轮询、换 token、列目录、
 * 换直链都在后端。浏览器里绝不直接调 115、不碰 AppSecret。
 * 文件夹选择器列的是 115 云端文件夹（按 cid 逐层展开），不复用选本地路径的
 * `POST /api/pick-folder`。 */
import { useEffect, useRef, useState } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';

import { apiGet, apiSend, errorMessage } from '../../api';
import type { ConfigurationGroupProps } from '../bundle';
import { StatusLabel } from '../components/status-label';
import { Note } from '../components/note';
import { ErrorText, Footer, Help, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';
import { t } from '../../i18n';
import { OPEN115_FOLDERS_URL, OPEN115_QRCODE_STATUS_URL, OPEN115_QRCODE_URL, OPEN115_URL } from '../../configuration-endpoints';

export interface Open115State {
  bound: boolean;
  user_id: string;
  user_name: string;
  vip_level: string;
  token_set: boolean;
  token_expires_at: number | null;
  root_cid: string;
  root_path: string;
  library_id: string;
  app_configured: boolean;
}

export interface Open115Folder {
  cid: string;
  name: string;
  size: number;
}

interface QrcodeSession {
  uid: string;
  qrcode: string;
  expires_in: number;
}

interface Crumb {
  cid: string;
  name: string;
}

const DEFAULT_STATE: Open115State = {
  bound: false, user_id: '', user_name: '', vip_level: '', token_set: false,
  token_expires_at: null, root_cid: '', root_path: '', library_id: '', app_configured: false,
};

/** 二维码可能是 data URI、图片地址或裸 base64，三种都按图片展示。 */
function qrcodeSrc(qrcode: string): string {
  if (qrcode.startsWith('data:') || qrcode.startsWith('http')) return qrcode;
  return `data:image/png;base64,${qrcode}`;
}

export function Open115Settings({ data, receipt }: ConfigurationGroupProps) {
  const [state, setState] = useState<Open115State>(data.open115 ?? DEFAULT_STATE);
  const [qr, setQr] = useState<QrcodeSession | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [folders, setFolders] = useState<Open115Folder[]>([]);
  const [crumbs, setCrumbs] = useState<Crumb[]>([{ cid: '0', name: t('settings:open115.rootFolder') }]);
  const [pendingRoot, setPendingRoot] = useState<{ cid: string; path: string } | null>(null);
  const [failure, setFailure] = useState('');
  const action = useAction();
  const pollTimer = useRef<number | null>(null);

  const stopPolling = () => {
    if (pollTimer.current !== null) {
      window.clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  };
  useEffect(() => stopPolling, []);

  /* 扫码轮询：每 2 秒问一次后端，绑上就停；离开页面也停。 */
  useEffect(() => {
    if (!qr) return undefined;
    const timer = window.setInterval(() => {
      void apiGet<{ status: number; bound: boolean } & Open115State>(
        `${OPEN115_QRCODE_STATUS_URL}?uid=${encodeURIComponent(qr.uid)}`,
      ).then((next) => {
        if (!next.bound) return;
        stopPolling();
        setQr(null);
        setState(next);
        setFailure('');
        receipt(t('settings:open115.bound'));
      }).catch((cause: unknown) => setFailure(errorMessage(cause)));
    }, 2000);
    pollTimer.current = timer;
    return () => window.clearInterval(timer);
  }, [qr, receipt]);

  const startQrcode = () => {
    void action.run('qrcode', (signal) => apiSend<QrcodeSession>(OPEN115_QRCODE_URL, {}, 'POST', signal),
      (next) => { setQr(next); setFailure(''); },
      (cause) => setFailure(errorMessage(cause)));
  };

  const loadFolders = (cid: string, nextCrumbs: Crumb[]) => {
    void action.run('folders', (signal) => apiGet<{ cid: string; folders: Open115Folder[] }>(
      `${OPEN115_FOLDERS_URL}?cid=${encodeURIComponent(cid)}`, signal),
    (next) => { setFolders(next.folders); setCrumbs(nextCrumbs); setPickerOpen(true); setFailure(''); },
    (cause) => setFailure(errorMessage(cause)));
  };

  const openFolder = (folder: Open115Folder) => {
    const path = [...crumbs.slice(1).map((crumb) => crumb.name), folder.name].join('/');
    setPendingRoot({ cid: folder.cid, path: `/${path}` });
    loadFolders(folder.cid, [...crumbs, { cid: folder.cid, name: folder.name }]);
  };

  const goCrumb = (index: number) => {
    const nextCrumbs = crumbs.slice(0, index + 1);
    setCrumbs(nextCrumbs);
    loadFolders(nextCrumbs[index]!.cid, nextCrumbs);
  };

  const save = () => {
    if (!pendingRoot) return;
    const body = { root_cid: pendingRoot.cid, root_path: pendingRoot.path, library_id: state.library_id };
    void action.run('save', (signal) => apiSend<Open115State>(OPEN115_URL, body, 'POST', signal),
      (next) => { setState(next); setPendingRoot(null); setPickerOpen(false); setFailure(''); receipt(t('settings:shared.settingsSaved')); },
      (cause) => setFailure(errorMessage(cause)));
  };

  const test = () => {
    void action.run('test', (signal) => apiSend<{ ok: boolean }>(`${OPEN115_URL}/test`, {}, 'POST', signal),
      () => { setFailure(''); receipt(t('settings:open115.testOk')); },
      (cause) => setFailure(errorMessage(cause)));
  };

  const disconnect = () => {
    void action.run('disconnect', (signal) => apiSend<Open115State>(`${OPEN115_URL}/disconnect`, {}, 'POST', signal),
      (next) => { setState(next); setQr(null); setFolders([]); setPickerOpen(false); setPendingRoot(null); setFailure(''); receipt(t('settings:open115.disconnected')); },
      (cause) => setFailure(errorMessage(cause)));
  };

  const account = state.bound
    ? (state.user_name || state.user_id) + (state.vip_level ? ` · ${state.vip_level}` : '')
    : t('settings:open115.notBound');

  return (
    <Section id="open115" title={t('settings:open115.title')}>
      <Stack>
        <Help>{t('settings:open115.help')}</Help>
        {!state.app_configured ? (
          <Note tone="warning" title={t('settings:open115.appNotConfiguredTitle')}>
            {t('settings:open115.appNotConfigured')}
          </Note>
        ) : null}
        {failure ? <ErrorText>{failure}</ErrorText> : null}
      </Stack>
      <Rows>
        <SettingsRow label={t('settings:open115.account')} description={account}>
          <StatusLabel tone={state.bound ? 'progress' : 'neutral'}>
            {state.bound ? t('settings:open115.bound') : t('settings:open115.notBound')}
          </StatusLabel>
        </SettingsRow>
        {state.bound && state.root_path ? (
          <SettingsRow label={t('settings:open115.currentFolder')} description={state.root_path}>
            <span>{t('settings:open115.bound')}</span>
          </SettingsRow>
        ) : null}
      </Rows>
      <Footer>
        {!state.bound ? (
          <Button variant="secondary" size="small" onClick={startQrcode} {...busyProps(action.busy === 'qrcode')}>
            {t('settings:open115.bindAccount')}
          </Button>
        ) : null}
        {state.bound ? (
          <>
            <Button variant="secondary" size="small" onClick={() => loadFolders('0', [{ cid: '0', name: t('settings:open115.rootFolder') }])} {...busyProps(action.busy === 'folders')}>
              {t('settings:open115.selectFolder')}
            </Button>
            <Button variant="secondary" size="small" onClick={test} {...busyProps(action.busy === 'test')}>
              {t('settings:open115.test')}
            </Button>
            <Button variant="secondary" size="small" onClick={disconnect} {...busyProps(action.busy === 'disconnect')}>
              {t('settings:open115.disconnect')}
            </Button>
          </>
        ) : null}
      </Footer>
      {qr ? (
        <Stack>
          <Help>{t('settings:open115.qrcodeHelp')}</Help>
          {qr.qrcode ? <img src={qrcodeSrc(qr.qrcode)} alt={t('settings:open115.qrcodeHelp')} /> : null}
          <Button variant="secondary" size="small" onClick={() => { stopPolling(); setQr(null); }}>
            {t('settings:open115.cancelQrcode')}
          </Button>
        </Stack>
      ) : null}
      {state.bound && pickerOpen ? (
        <Stack>
          <div>
            {crumbs.map((crumb, index) => (
              <span key={crumb.cid}>
                {index > 0 ? ' / ' : ''}
                <Button variant="secondary" size="small" onClick={() => goCrumb(index)}>{crumb.name}</Button>
              </span>
            ))}
          </div>
          {folders.length === 0 ? <Help>{t('settings:open115.noSubfolders')}</Help> : null}
          {folders.map((folder) => (
            <div key={folder.cid}>
              <Button variant="secondary" size="small" onClick={() => openFolder(folder)}>{folder.name}</Button>
            </div>
          ))}
          {pendingRoot ? (
            <Footer>
              <span>{pendingRoot.path}</span>
              <Button variant="primary" size="small" onClick={save} {...busyProps(action.busy === 'save')}>
                {t('settings:open115.saveFolder')}
              </Button>
            </Footer>
          ) : null}
        </Stack>
      ) : null}
    </Section>
  );
}
