import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { isConnectFulfilled } from 'modules/auth';

import { featureConfig } from 'modules/common/featureConfig';
import { selectEarlyAccessData } from '../actions/getEarlyAccessData';
import {
  REGISTER_WALLET_CACHE_KEY,
  registerWalletAction,
} from '../actions/registerWallet';
import { getAccessCode } from '../utils/storeAccessCode';

export const walletAddrMiddleware: Middleware = store => next => action => {
  if (featureConfig.accessGuard && isConnectFulfilled(action)) {
    const { getState, dispatch } = store;
    const { address } = action.payload;

    const state = getState();
    const earlyAccess = selectEarlyAccessData()(state);
    const { wallet } = earlyAccess.data || {};
    const code = getAccessCode();

    if (!wallet && code && address) {
      const registerWalletThunk = registerWalletAction.initiate(
        { code, wallet: address },
        { fixedCacheKey: REGISTER_WALLET_CACHE_KEY },
      );

      dispatch(registerWalletThunk as unknown as UnknownAction);
    }
  }

  return next(action);
};
