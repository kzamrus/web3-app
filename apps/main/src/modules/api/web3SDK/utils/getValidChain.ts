import { TChainId } from 'modules/api/chainIDs';
import { ETH_NETWORK_BY_ENV } from 'modules/api/sdk';
import { SUPPORTED_CHAINS } from '../const';

const defaultChain: TChainId = ETH_NETWORK_BY_ENV;
const supportedChains: TChainId[] = SUPPORTED_CHAINS;

export function getValidChain(chainId?: number): TChainId {
  if (!chainId) {
    return defaultChain;
  }
  const chain = chainId as TChainId;
  return supportedChains.includes(chain) ? chain : defaultChain;
}
