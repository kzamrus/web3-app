import { EWalletId } from '@ankr.com/provider';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { useTranslation } from 'modules/i18n';
import { useCallback } from 'react';
import { IConnectButtonProps } from '../../types';
import { translation } from './translation';
import { useConnection } from '../../../../hooks/useConnection.ts';

export function ConnectWalletConnect({
  isDisabled,
}: IConnectButtonProps): React.JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { connect } = useConnection();

  const handleConnect = useCallback(() => {
    connect(EWalletId.walletconnect);
  }, []);

  return (
    <ConnectBtn
      onClick={handleConnect}
      isDisabled={isDisabled}
      title={t(keys.title)}
      subtitle={t(keys.subtitle)}
      iconSlot={<WalletIcon wallet={EWalletId.walletconnect} />}
    />
  );
}
