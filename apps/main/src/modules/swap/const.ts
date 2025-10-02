import { OChainId, OLstToken } from 'modules/api';
import { BTC_DECIMALS } from 'modules/common/const';

export const SUPPORTED_SWAP_TOKENS = [
  { symbol: OLstToken.LBTC, decimals: BTC_DECIMALS },
  { symbol: 'WBTC', decimals: BTC_DECIMALS },
] as const;

export type SupportedSwapToken =
  (typeof SUPPORTED_SWAP_TOKENS)[number]['symbol'];

export const DEMO_GAS = 9.19; // USD
export const DEMO_NETWORK_FEE = 12.584; // USD
export const DEMO_WBTC_LBTC_PAIR = 0.99998;

export const LBTC_ADDRESS = '0x8236a87084f8b84306f72007f36f2618a5634494';

export const ETH_STANDARD = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
export const ETH_USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC

export const DEFAULT_FROM_TOKEN = ETH_STANDARD;
export const DEFAULT_TO_TOKEN = LBTC_ADDRESS;

export const ACTION_CACHE_GAS_PRICE = 30000;

export const LBTC = {
  [LBTC_ADDRESS]: {
    address: LBTC_ADDRESS,
    symbol: 'LBTC',
    decimals: 8,
    name: 'Lombard Staked Bitcoin',
    logoURI: 'https://etherscan.io/token/images/lombardfinance_32.png',
    eip2612: false,
    tags: ['tokens'],
  },
};

export const SUPPORTED_CHAIN = OChainId.ethereum;

export const OSlippageKey = {
  auto: 'auto',
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export type TSlippageKey = (typeof OSlippageKey)[keyof typeof OSlippageKey];

export const OSlippageValue = {
  low: 0.1,
  medium: 0.5,
  high: 1,
} as const;

export type TSlippageValue =
  (typeof OSlippageValue)[keyof typeof OSlippageValue];

export const slippageValuesMap = {
  [OSlippageKey.auto]: OSlippageValue.low,
  [OSlippageKey.low]: OSlippageValue.low,
  [OSlippageKey.medium]: OSlippageValue.medium,
  [OSlippageKey.high]: OSlippageValue.high,
} as const;
