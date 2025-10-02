import { depositBtcRouteConfig } from 'modules/deposit-btc/depositBtcRoutesConfig';
import { DepositSelect } from '../DepositSelect';
import { StakeBtcWithWallet } from '../StakeBtcWithWallet';

export function DepositBtc(): JSX.Element {
  const { chain } = depositBtcRouteConfig.main.useParams();

  if (chain) {
    return <StakeBtcWithWallet />;
  }

  return <DepositSelect />;
}
