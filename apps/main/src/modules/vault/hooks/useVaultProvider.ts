import { BrowserProvider } from 'ethers';
import { useConnection } from 'modules/auth';
import { useEffect, useState } from 'react';
import { VaultProvider } from '../sdk/VaultProvider';

export const useVaultProvider = () => {
  const { isConnected } = useConnection();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    const initProvider = async () => {
      const providerInstance = await VaultProvider.getInstance();
      setProvider(providerInstance);
    };

    initProvider();
  }, [isConnected]);

  return provider;
};
