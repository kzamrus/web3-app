import { useConnectBtnOKX } from '@ankr.com/provider';
import { ConnectBtn } from 'modules/auth/components/ConnectBtn';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { useTranslation } from 'modules/i18n';
import { useConnectBtnAdapter } from '../../hooks/useConnectBtnAdapter';
import { IConnectButtonProps } from '../../types';
import { translation } from './translation';

export function ConnectOKX({ isDisabled }: IConnectButtonProps): JSX.Element {
  const connectProps = useConnectBtnOKX();
  const props = useConnectBtnAdapter(connectProps);
  const { keys, t } = useTranslation(translation);

  return (
    <ConnectBtn
      {...props}
      isDisabled={isDisabled || props.isDisabled}
      title={t(keys.title)}
      iconSlot={<WalletIcon wallet={connectProps.walletId} />}
    />
  );
}
