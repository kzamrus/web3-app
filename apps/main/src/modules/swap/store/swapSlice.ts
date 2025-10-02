import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapAggregationResult } from '../actions/getSwapAggregation';
import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';

export interface ISwapState {
  exchanged: boolean;
  requote: {
    data?: SwapAggregationResult;
    isLoading: boolean;
  };
  receiveAmount: BigNumber;
  sendAmount: BigNumber;
}

interface IRootState {
  swap: ISwapState;
}

const initialState: ISwapState = {
  exchanged: false,
  requote: {
    isLoading: false,
  },
  receiveAmount: ZERO,
  sendAmount: ZERO,
};

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setExchanged: (
      state,
      action: PayloadAction<Pick<ISwapState, 'exchanged'>>,
    ) => {
      state.exchanged = action.payload.exchanged;
    },
    setRequote: (state, action: PayloadAction<Pick<ISwapState, 'requote'>>) => {
      state.requote = action.payload.requote;
    },
    setSwapData: (
      state,
      action: PayloadAction<Pick<ISwapState, 'receiveAmount' | 'sendAmount'>>,
    ) => {
      state.sendAmount = action.payload.sendAmount ?? ZERO;
      state.receiveAmount = action.payload.receiveAmount ?? ZERO;
    },
  },
});

export const selectSwapState = (state: IRootState) => state.swap;

export const { setExchanged, setRequote, setSwapData } = swapSlice.actions;
