import { OChainId, TChainId } from 'modules/api/chainIDs';
import { IS_PROD } from 'modules/common/const';
import { TChainName } from '../types';

/**
 * @param chainId the chain ID
 *
 * @returns the chain name
 */
export function getCainIdByName(chain: string): TChainId {
  switch (chain as TChainName) {
    case 'DESTINATION_BLOCKCHAIN_ETHEREUM':
      return IS_PROD ? OChainId.ethereum : OChainId.holesky;

    default:
      return OChainId.ethereum;
  }
}
