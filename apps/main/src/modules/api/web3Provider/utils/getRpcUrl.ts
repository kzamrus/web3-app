import { RPC_URLS_BY_NETWORK } from '@ankr.com/provider';
import { RPC_URLS_BY_NETWORK as LOCAL_RPC_URLS } from 'modules/api/rpcConfig';

type AvailableChainId = keyof typeof LOCAL_RPC_URLS;

/**
 * Returns RPC URL by chainId. Throws an error if chainId is not found.
 *
 * @param {number} chainId Chain ID
 * @return {string} RPC URL
 */
export function getRpcUrl(chainId: number): string {
  const urls = { ...RPC_URLS_BY_NETWORK, ...LOCAL_RPC_URLS };
  const rpcUrl = urls[chainId as AvailableChainId];
  if (!rpcUrl) {
    throw new Error(`RPC URL not found for chainId: ${chainId}`);
  }
  return rpcUrl;
}
