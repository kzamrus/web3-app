import { useConnectBtnMetaMask } from '@ankr.com/provider';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { useConnectBtnAdapter } from '../../hooks/useConnectBtnAdapter';
import { IConnectButtonProps } from '../../types';
import { translation } from './translation';

export function ConnectMetamask({
  isDisabled,
}: IConnectButtonProps): JSX.Element {
  const connectProps = useConnectBtnMetaMask();
  const props = useConnectBtnAdapter(connectProps);
  const { keys, t } = useTranslation(translation);

  const tooltip = useMemo(() => {
    if (connectProps.isDisabledByBitget) {
      return t(keys.disabledByBitget);
    }
    if (connectProps.isDisabledByOtherWallets) {
      return t(keys.disabledByBitget);
    }

    return undefined;
  }, [connectProps.isDisabledByBitget, keys, t]);

  return (
    <ConnectBtn
      {...props}
      isDisabled={isDisabled || props.isDisabled}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={connectProps.walletId} />}
      tooltip={tooltip}
    />
  );
}
