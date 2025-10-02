import { IUseDiagolData, useDialog } from 'modules/dialogs';
import { BTC_WALLET_CONNECT_DIALOG_ID } from '../const';

export const useBtcConnectionModal = (): IUseDiagolData<never> =>
  useDialog(BTC_WALLET_CONNECT_DIALOG_ID);
