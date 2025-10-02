import { TChainId } from 'modules/api';
import { getChainIdFromQeryParams } from 'modules/common/utils/getChainIdFromQeryParams';
import { unstakeRoutesConfig } from 'modules/unstake/unstakeRoutesConfig';

interface IUnstakeQueryParams {
  chainId?: TChainId;
  txHash?: string;
  amount?: string;
  isValidTxHash: boolean;
}

export function useUnstakeStatus(): IUnstakeQueryParams {
  const { network, txHash, amount } = unstakeRoutesConfig.status.useParams();

  const chainId = getChainIdFromQeryParams(network);

  const isValidTxHash = !!txHash && txHash.length === 66;

  return {
    chainId,
    txHash,
    amount,
    isValidTxHash,
  };
}
