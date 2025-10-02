import { OBtcWalletId, TNetworkMode, getOkxBtcWallet } from 'modules/api';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { IS_PROD } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { translation } from './translation';

const walletId = OBtcWalletId.OKX;
const networkMode: TNetworkMode = IS_PROD ? 'mainnet' : 'testnet';

export function ConnectOKX(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getOkxBtcWallet(networkMode),
  });

  return (
    <ConnectBtn
      {...props}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={walletId} />}
    />
  );
}
