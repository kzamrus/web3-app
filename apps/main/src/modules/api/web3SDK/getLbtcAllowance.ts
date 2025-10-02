import { OLstToken } from '../tokens';
import { ReadProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';
import { Address } from 'modules/common/types';
import BigNumber from 'bignumber.js';

export async function getLbtcAllowance(
  provider: ReadProvider,
  data: { address: Address; spender: Address },
): Promise<BigNumber> {
  const tokenContract = getTokenContract(provider, OLstToken.LBTC);
  const { address, spender } = data;

  const allowance: bigint = await tokenContract.methods
    .allowance(address, spender)
    .call();

  return new BigNumber(allowance.toString(10));
}
