import { OBtcWalletId, TNetworkMode, getOkxBtcWallet } from 'modules/api';
import { IS_PROD } from 'modules/common/const';
import { useBtcConnectBtnAdapter } from '../../hooks/useBtcConnectBtnAdapter';
import { IStakeButtonProps, StakeButton } from './StakeButton';

const walletId = OBtcWalletId.OKX;
const networkMode: TNetworkMode = IS_PROD ? 'mainnet' : 'testnet';

export function StakeButtonOkx({
  isDisabled,
}: Pick<IStakeButtonProps, 'isDisabled'>): JSX.Element {
  const props = useBtcConnectBtnAdapter({
    walletId,
    isInjected: !!getOkxBtcWallet(networkMode),
    isDisabled,
  });

  return <StakeButton {...props} />;
}
