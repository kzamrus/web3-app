import { TEvmWalletId } from 'modules/api';
import { useCallback } from 'react';
import { useConnectMutation } from '../actions/connect';
import { useDisconnectMutation } from '../actions/disconnect';
import { CONNECTION_CACHE_KEY } from '../const';
import { EWalletId } from '@ankr.com/provider';

export interface IConnectionData {
  address?: string;
  chainId?: number;
  isConnected: boolean;
  isLoading: boolean;
  walletIcon?: string;
  walletId?: string;
  connect: (walletID?: TEvmWalletId) => void;
  disconnect: () => void;
  features: { isAddTokenAvailable: boolean };
}

export function useConnection(): IConnectionData {
  const [connect, { data, isLoading }] = useConnectMutation({
    fixedCacheKey: CONNECTION_CACHE_KEY,
  });

  const [disconnect] = useDisconnectMutation({
    fixedCacheKey: CONNECTION_CACHE_KEY,
  });

  const {
    address,
    chainId,
    isActive: isConnected = false,
    walletId,
  } = data ?? {};

  const handleDisconnect = useCallback(() => {
    const result = disconnect();
    result.reset();
  }, [disconnect]);

  return {
    address,
    chainId,
    isConnected,
    isLoading,
    walletId,
    connect,
    disconnect: handleDisconnect,
    features: {
      isAddTokenAvailable: walletId !== EWalletId.walletconnect,
    },
  };
}
