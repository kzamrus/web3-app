import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDialogState {
  currentModal?: string;
  context?: unknown;
}

interface IRootState {
  dialog: IDialogState;
}

const initialState: IDialogState = {};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<IDialogState>) => {
      state.currentModal = action.payload.currentModal;
      state.context = action.payload.context;
    },
    closeDialog: state => {
      state.currentModal = undefined;
      state.context = undefined;
    },
  },
});

export const selectDialogState = (state: IRootState) => state.dialog;

export const { openDialog, closeDialog } = dialogSlice.actions;
