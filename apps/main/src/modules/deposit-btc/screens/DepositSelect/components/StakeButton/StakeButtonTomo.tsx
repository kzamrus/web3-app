import { OBtcWalletId } from 'modules/api';
import { getTomoBtcProvider } from 'modules/api/btcProvider/providers/Tomo';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { IStakeButtonProps, StakeButton } from './StakeButton';

const walletId = OBtcWalletId.Tomo;

export function StakeButtonTomo({
  isDisabled,
}: Pick<IStakeButtonProps, 'isDisabled'>): JSX.Element {
  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getTomoBtcProvider(),
    isDisabled,
  });

  return <StakeButton {...props} />;
}
