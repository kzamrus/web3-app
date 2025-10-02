import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import { listenerMiddleware } from 'modules/auth';
import { bannersPersistReducer, bannersSlice } from 'modules/banners';
import { dashboardPersistReducer, dashboardSlice } from 'modules/dashboard';
import { bridgeSlice } from 'modules/bridge/store/bridgeSlice';
import { dialogSlice } from 'modules/dialogs';
import { walletAddrMiddleware } from 'modules/early-access/store/walletAddrMiddleware';
import { web3Api } from './web3Api';
import { slippagePersistReducer } from 'modules/swap/store/slippagePersistReducer';
import { slippageSlice } from 'modules/swap/store/slippageSlice';
import { swapSlice } from 'modules/swap/store/swapSlice';

const rootReducer = combineReducers({
  [web3Api.reducerPath]: web3Api.reducer,
  [dialogSlice.name]: dialogSlice.reducer,
  [bridgeSlice.name]: bridgeSlice.reducer,
  [swapSlice.name]: swapSlice.reducer,
  [dashboardSlice.name]: dashboardPersistReducer,
  [bannersSlice.name]: bannersPersistReducer,
  [slippageSlice.name]: slippagePersistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // TODO: fix serializable error
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: false,
    })
      .concat(listenerMiddleware.middleware)
      .concat(web3Api.middleware)
      .concat(walletAddrMiddleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
