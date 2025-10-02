import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  closeDialog,
  openDialog,
  selectDialogState,
} from '../store/dialogSlice';

export interface IUseDiagolData<T> {
  isOpened: boolean;
  context: T;
  onClose: () => void;
  onOpen: () => void;
}

export function useDialog<TContext = unknown>(
  modalId: string,
  contextArg?: TContext,
): IUseDiagolData<TContext> {
  const dispatch = useDispatch();
  const dialogState = useSelector(selectDialogState);
  const isOpened = dialogState.currentModal === modalId;
  const context = dialogState.context as TContext;

  const handleClose = useCallback(() => dispatch(closeDialog()), [dispatch]);

  const handleOpen = useCallback(() => {
    if (isOpened) {
      return;
    }
    dispatch(openDialog({ currentModal: modalId, context: contextArg }));
  }, [contextArg, dispatch, isOpened, modalId]);

  return {
    isOpened,
    context,
    onClose: handleClose,
    onOpen: handleOpen,
  };
}
