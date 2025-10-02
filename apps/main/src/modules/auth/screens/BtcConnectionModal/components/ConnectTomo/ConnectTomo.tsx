import { OBtcWalletId } from 'modules/api';
import { getTomoBtcProvider } from 'modules/api/btcProvider/providers/Tomo';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { useTranslation } from 'modules/i18n';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { translation } from './translation';

const walletId = OBtcWalletId.Tomo;

export function ConnectTomo(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getTomoBtcProvider(),
  });

  return (
    <ConnectBtn
      {...props}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={walletId} />}
    />
  );
}
