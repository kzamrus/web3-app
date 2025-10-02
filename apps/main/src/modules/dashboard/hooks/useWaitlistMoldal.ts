import { IUseDiagolData, useDialog } from 'modules/dialogs';

export const useWaitlistMoldal = (): IUseDiagolData<never> =>
  useDialog('waitlistModal');
