import {
  ConnectDialog,
  ConnectDialogButtons,
  ConnectDialogTitle,
} from 'modules/auth/components/ConnectDialog';
import { useBtcConnectionModal } from 'modules/auth/hooks/useBtcConnectionModal';
import { featureConfig } from 'modules/common/featureConfig';
import { useTranslation } from 'modules/i18n';
import { ConnectBitget } from './components/ConnectBitget';
import { ConnectOKX } from './components/ConnectOKX';
import { ConnectTomo } from './components/ConnectTomo';
import { ConnectXverse } from './components/ConnectXverse';
import { translation } from './translation';

export function BtcConnectionModal(): JSX.Element {
  const { isOpened, onClose } = useBtcConnectionModal();
  const { keys, t } = useTranslation(translation);

  return (
    <ConnectDialog open={isOpened} onClose={onClose}>
      <ConnectDialogTitle>{t(keys.title)}</ConnectDialogTitle>

      <ConnectDialogButtons>
        <ConnectOKX />

        <ConnectXverse />

        {featureConfig.isBtcTomoWalletActive && <ConnectTomo />}

        {featureConfig.isBtcBitgetWalletActive && <ConnectBitget />}
      </ConnectDialogButtons>
    </ConnectDialog>
  );
}
