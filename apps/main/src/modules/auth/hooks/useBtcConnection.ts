import { TBtcWalletId } from 'modules/api';
import { useCallback } from 'react';
import { useConnectBtcMutation } from '../actions/connectBtc';
import { useDisconnectBtcMutation } from '../actions/disconnectBtc';
import { BTC_CONNECTION_CACHE_KEY } from '../const';

export interface IBtcConnectionData {
  address?: string;
  isConnected: boolean;
  isLoading: boolean;
  walletId?: TBtcWalletId;
  connect: (providerId?: TBtcWalletId) => void;
  disconnect: () => void;
}

export function useBtcConnection(): IBtcConnectionData {
  const [connect, { data, isLoading }] = useConnectBtcMutation({
    fixedCacheKey: BTC_CONNECTION_CACHE_KEY,
  });

  const [disconnect] = useDisconnectBtcMutation({
    fixedCacheKey: BTC_CONNECTION_CACHE_KEY,
  });

  const { address, isActive: isConnected = false, walletId } = data ?? {};

  const handleDisconnect = useCallback(() => {
    const result = disconnect();
    result.reset();
  }, [disconnect]);

  return {
    address,
    isConnected,
    isLoading,
    walletId,
    connect,
    disconnect: handleDisconnect,
  };
}
