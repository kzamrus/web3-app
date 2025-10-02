import { TChainId } from 'modules/api';
import { TxHash } from 'modules/bridge/types';

export interface SendTxIdFormValues {
  txHash: TxHash | '';
  chainId: TChainId;
}
