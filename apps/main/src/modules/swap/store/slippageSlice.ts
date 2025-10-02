import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OSlippageKey, TSlippageKey } from '../const';

export interface ISlippageState {
  slippageKey: TSlippageKey;
}

interface IRootState {
  slippage: ISlippageState;
}

const initialState: ISlippageState = {
  slippageKey: OSlippageKey.auto,
};

export const slippageSlice = createSlice({
  name: 'slippage',
  initialState,
  reducers: {
    changeSlippage: (
      state,
      action: PayloadAction<Pick<ISlippageState, 'slippageKey'>>,
    ) => {
      state.slippageKey = action.payload.slippageKey;
    },
  },
});

export const selectSlippageState = (state: IRootState) => state.slippage;

export const { changeSlippage } = slippageSlice.actions;
