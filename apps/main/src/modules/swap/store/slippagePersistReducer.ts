import { persistReducer } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { slippageSlice, ISlippageState } from './slippageSlice';

export type TDashboardState = ISlippageState & {
  _persist: PersistState;
};

const persistConfig = {
  key: slippageSlice.name,
  storage,
};

export const slippagePersistReducer = persistReducer(
  persistConfig,
  slippageSlice.reducer,
);
