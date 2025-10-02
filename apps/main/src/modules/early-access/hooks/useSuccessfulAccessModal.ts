import { IUseDiagolData, useDialog } from 'modules/dialogs';

export const SUCCESSFUL_ACCESS_MODAL_ID = 'successfulAccessModal';

export const useSuccessfulAccessModal = (): IUseDiagolData<never> =>
  useDialog(SUCCESSFUL_ACCESS_MODAL_ID);
