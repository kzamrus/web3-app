import { IWeb3SendResult } from '@ankr.com/provider';
import { OLstToken } from '../tokens';
import { WriteProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';

export function withdrawFromBridge(
  provider: WriteProvider,
  data: { rawPayload: string; rawReceipt: string; proofSignature: string },
): Promise<IWeb3SendResult> {
  const tokenContract = getTokenContract(provider, OLstToken.LBTC);
  const { rawPayload, rawReceipt, proofSignature } = data;

  const tx = tokenContract.methods.withdrawFromBridge(
    rawPayload,
    rawReceipt,
    proofSignature,
  );

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
