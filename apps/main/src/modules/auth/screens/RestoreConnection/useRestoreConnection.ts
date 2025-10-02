import { useEffect } from 'react';

import { Milliseconds } from 'modules/common/types';
import { useConnectMutation } from '../../actions/connect';
import { CONNECTION_CACHE_KEY } from '../../const';
import {
  removeStoredWalletId,
  restoreWalletId,
} from '../../utils/storeWalletId';

const restoreTimeout: Milliseconds = 5000;

export const useRestoreConnection = (): void => {
  const [connect, { reset: resetConnection }] = useConnectMutation({
    fixedCacheKey: CONNECTION_CACHE_KEY,
  });

  useEffect(() => {
    const walletId = restoreWalletId();

    if (walletId) {
      const timeout = setTimeout(() => {
        // if connection is not restored in time, remove stored wallet id
        // and reset connection attempt
        removeStoredWalletId();
        resetConnection();
      }, restoreTimeout);

      connect(walletId)
        .unwrap()
        .then(() => {
          // if connection is restored, cancel timeout
          clearTimeout(timeout);
        })
        .catch(() => {
          // if connection is not restored, remove stored wallet id
          removeStoredWalletId();
        });
    }
  }, [connect]);
};
