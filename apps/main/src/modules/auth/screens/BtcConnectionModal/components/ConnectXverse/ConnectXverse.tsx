import { OBtcWalletId, getXverseBtcProvider } from 'modules/api';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { useTranslation } from 'modules/i18n';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { translation } from './translation';

const walletId = OBtcWalletId.Xverse;

export function ConnectXverse(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getXverseBtcProvider(),
  });

  return (
    <ConnectBtn
      {...props}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={walletId} />}
    />
  );
}
