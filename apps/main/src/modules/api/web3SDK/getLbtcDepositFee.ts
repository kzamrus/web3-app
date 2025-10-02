import BigNumber from 'bignumber.js';
import { TChainId } from '../chainIDs';
import { OLstToken } from '../tokens';
import { getReadProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';

export async function getLbtcDepositFeeRate(
  fromChainId: TChainId,
  toChainId: TChainId,
): Promise<number> {
  const provider = await getReadProvider(fromChainId);

  const tokenContract = getTokenContract(provider, OLstToken.LBTC);

  const depositComission = (await tokenContract.methods
    .getDepositCommission(toChainId)
    .call()) as number;
  const maxComission: bigint = await tokenContract.methods
    .MAX_COMMISSION()
    .call();

  return new BigNumber(depositComission)
    .div(maxComission.toString())
    .toNumber();
}
