import { IWeb3SendResult } from '@ankr.com/provider';
import { OLstToken } from '../tokens';
import { WriteProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';
import { Address } from 'modules/common/types';

export function approveToBridge(
  provider: WriteProvider,
  data: { spender: Address; amount: number },
): Promise<IWeb3SendResult> {
  const tokenContract = getTokenContract(provider, OLstToken.LBTC);
  const { spender, amount } = data;

  const tx = tokenContract.methods.approve(spender, amount);

  return provider.sendTransactionAsync(
    provider.currentAccount,
    tokenContract.options.address,
    {
      data: tx.encodeABI(),
      estimate: true,
      estimateFee: true,
      gasLimitMultiplier: 1.3,
    },
  );
}
