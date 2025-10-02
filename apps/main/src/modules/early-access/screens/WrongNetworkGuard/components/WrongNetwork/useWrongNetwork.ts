import { useConnection } from 'modules/auth';
import { OChainId } from 'modules/api';

export function useWrongNetwork() {
  const { chainId = OChainId.unsupported, isConnected } = useConnection();

  return isConnected && chainId !== OChainId.ethereum;
}
