import { OBtcWalletId, getBitgetBtcProvider } from 'modules/api';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { IStakeButtonProps, StakeButton } from './StakeButton';

const walletId = OBtcWalletId.Bitget;

export function StakeButtonBitget({
  isDisabled,
}: Pick<IStakeButtonProps, 'isDisabled'>): JSX.Element {
  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getBitgetBtcProvider(),
    isDisabled,
  });

  return <StakeButton {...props} />;
}
