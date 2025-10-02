import { TChainId } from 'modules/api';
import { getChainIdFromQeryParams } from 'modules/common/utils/getChainIdFromQeryParams';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';

interface IUseClaimQueryParams {
  chainId?: TChainId;
  txHash?: string;
  isValidTxHash: boolean;
}

export function useClaimQueryParams(): IUseClaimQueryParams {
  const { network, txHash } = dashboardRouteConfig.claimStatus.useParams();

  const chainId = getChainIdFromQeryParams(network);

  const isValidTxHash = !!txHash && txHash.length === 66;

  return {
    chainId,
    txHash,
    isValidTxHash,
  };
}
