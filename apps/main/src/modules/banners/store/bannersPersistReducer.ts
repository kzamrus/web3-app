import { persistReducer } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { bannersSlice, TBannersSlice } from './bannersSlice';

export type TBannersState = TBannersSlice & {
  _persist: PersistState;
};

const persistConfig = {
  key: bannersSlice.name,
  storage,
};

export const bannersPersistReducer = persistReducer(
  persistConfig,
  bannersSlice.reducer,
);
