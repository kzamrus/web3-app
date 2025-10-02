import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOptimisticClaim {
  /**
   * Bitcoin transaction ID that was claimed
   */
  txId: string;
  /**
   * Timestamp when the claim was added
   */
  timestamp: number;
}

export interface IDashboardSlice {
  optimisticClaims: IOptimisticClaim[];
}

const initialState: IDashboardSlice = {
  optimisticClaims: [],
};

export const dashboardSlice = createSlice({
  name: 'lbtcDashboard',
  initialState,
  reducers: {
    addOptimisticClaim: (state, action: PayloadAction<IOptimisticClaim>) => {
      state.optimisticClaims = [...state.optimisticClaims, action.payload];
    },
    setOptimisticClaims: (state, action: PayloadAction<IOptimisticClaim[]>) => {
      state.optimisticClaims = action.payload;
    },
  },
});

const selectDashboard = (state: { lbtcDashboard: IDashboardSlice }) =>
  state.lbtcDashboard;

export const selectOptimisticClaims = createSelector(
  selectDashboard,
  state => state.optimisticClaims,
);

export const { addOptimisticClaim, setOptimisticClaims } =
  dashboardSlice.actions;
