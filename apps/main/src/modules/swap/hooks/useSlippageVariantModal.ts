import { IUseDiagolData, useDialog } from '../../dialogs';

const MODAL_ID = 'slippageVariantModal';

export const useSlippageVariantModal = (): IUseDiagolData<never> =>
  useDialog(MODAL_ID);
