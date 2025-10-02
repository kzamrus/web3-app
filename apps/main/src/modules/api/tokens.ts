export const ONativeToken = {
  BTC: 'BTC',
  WBTC: 'WBTC',
} as const;

export type TNativeToken = (typeof ONativeToken)[keyof typeof ONativeToken];

export const OLstToken = {
  LBTC: 'LBTC',
  WBTC: 'WBTC',
} as const;

export const OLstvToken = {
  LBTCV: 'LBTCV',
} as const;

export type TLstToken = (typeof OLstToken)[keyof typeof OLstToken];
