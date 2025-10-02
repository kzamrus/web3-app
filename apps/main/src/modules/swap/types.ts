import { Address } from '@ankr.com/provider';

export interface SwapFormValues {
  fromToken: Address;
  fromAmount: string;
  toToken: Address;
  toAmount: string;
}
