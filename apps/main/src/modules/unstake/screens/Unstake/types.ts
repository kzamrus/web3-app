import { TChainId } from 'modules/api';

export interface IUnstakingFormValues {
  chain: TChainId;
  amount: string;
  btcAddress: string;
}
