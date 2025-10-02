import { OChainId, TChainId } from 'modules/api/chainIDs';
import { OChainName, TChainName } from '../types';

/**
 * @param chainId the chain ID
 *
 * @returns the chain name
 */
export function getChainNameById(chainId: TChainId): TChainName {
  switch (chainId) {
    case OChainId.holesky:
    case OChainId.ethereum:
      return OChainName.eth;
    default:
      throw new Error(`Unknown chain ID: ${chainId}`);
  }
}
