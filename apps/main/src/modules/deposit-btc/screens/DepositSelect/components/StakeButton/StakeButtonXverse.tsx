import { OBtcWalletId, getXverseBtcProvider } from 'modules/api';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { IStakeButtonProps, StakeButton } from './StakeButton';

const walletId = OBtcWalletId.Xverse;

export function StakeButtonXverse({
  isDisabled,
}: Pick<IStakeButtonProps, 'isDisabled'>): JSX.Element {
  const props = useBtcConnectBtnAdapter({
    walletId,
    isDisabled,
    isInjected: !!getXverseBtcProvider(),
  });

  return <StakeButton {...props} />;
}
