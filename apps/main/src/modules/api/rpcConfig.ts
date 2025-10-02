import { OChainId } from './chainIDs';

/**
 * RPC URLS for HTTP providers by network id.
 */
export const RPC_URLS_BY_NETWORK = {
  [OChainId.ethereum]: 'https://rpc.ankr.com/eth',
  [OChainId.zircuit]: 'https://zircuit1.p2pify.com/',
} as const;
