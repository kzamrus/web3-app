import { IUseDiagolData, useDialog } from 'modules/dialogs';
import { WALLET_CONNECT_DIALOG_ID } from '../const';

export const useWalletConnectModal = (): IUseDiagolData<never> =>
  useDialog(WALLET_CONNECT_DIALOG_ID);
