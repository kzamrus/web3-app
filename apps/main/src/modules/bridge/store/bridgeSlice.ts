import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedChain } from '../types';
import { SUPPORTED_CHAINS } from '../const';
import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';
import { ProgressStage } from '../screens/BridgeInProgress/types';

export interface IBridgeState {
  progress: ProgressStage;
  chainFrom: SupportedChain | null;
  chainTo: SupportedChain | null;
  amount: BigNumber;
  approved: boolean;
  claimedTxHash: string;
}

interface IRootState {
  bridge: IBridgeState;
}

const initialState: IBridgeState = {
  progress: 'send',
  chainFrom: null,
  chainTo: null,
  approved: false,
  amount: ZERO,
  claimedTxHash: '',
};

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<Pick<IBridgeState, 'amount'>>) => {
      state.amount = action.payload.amount;
    },
    changeProgress: (
      state,
      action: PayloadAction<Pick<IBridgeState, 'progress'>>,
    ) => {
      state.progress = action.payload.progress;
    },
    setClaimedTxHash: (
      state,
      action: PayloadAction<Pick<IBridgeState, 'claimedTxHash'>>,
    ) => {
      state.claimedTxHash = action.payload.claimedTxHash;
    },
    updateChainsPair(
      state,
      action: PayloadAction<Pick<IBridgeState, 'chainFrom' | 'chainTo'>>,
    ) {
      state.chainFrom = action.payload.chainFrom;
      state.chainTo = action.payload.chainTo;
    },
    changeApproved(
      state,
      action: PayloadAction<Pick<IBridgeState, 'approved'>>,
    ) {
      state.approved = action.payload.approved;
    },
    reset(state) {
      state.progress = 'send';
      state.chainFrom = SUPPORTED_CHAINS.find(
        chain => chain.abbr === 'holesky',
      )!;
      state.chainTo = SUPPORTED_CHAINS.find(chain => chain.abbr === 'mantle')!;
      state.amount = ZERO;
    },
  },
});

export const selectBridgeState = (state: IRootState) => state.bridge;

export const {
  changeProgress,
  changeApproved,
  updateChainsPair,
  setAmount,
  reset,
  setClaimedTxHash,
} = bridgeSlice.actions;
