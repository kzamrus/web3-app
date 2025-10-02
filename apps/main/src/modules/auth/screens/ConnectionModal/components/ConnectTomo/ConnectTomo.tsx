import { OEvmWalletId } from 'modules/api';
import { getTomoWalletProvider } from 'modules/api/web3Provider/connectors/tomoConnector';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { DOWNLOAD_WALLET_LINK } from 'modules/common/walletLinks';
import { useTranslation } from 'modules/i18n';
import { useConnectBtnAdapter } from '../../hooks/useConnectBtnAdapter';
import { IConnectButtonProps } from '../../types';
import { translation } from './translation';

const walletId = OEvmWalletId.tomo;
const isDeepLinkSupported = false;

export function ConnectTomo({
  isDisabled,
}: IConnectButtonProps): JSX.Element | null {
  const { keys, t } = useTranslation(translation);
  const isInjected = !!getTomoWalletProvider();

  const { isMobile, ...props } = useConnectBtnAdapter({
    downloadUrl: DOWNLOAD_WALLET_LINK[walletId],
    isInjected,
    walletId,
  });

  if (isMobile && !isDeepLinkSupported) {
    return null;
  }

  return (
    <ConnectBtn
      {...props}
      isDisabled={isDisabled || props.isDisabled}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={walletId} />}
    />
  );
}
