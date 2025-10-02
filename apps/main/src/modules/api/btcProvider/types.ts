export type TNetworkMode = 'mainnet' | 'testnet';

export const OBtcWalletId = {
  OKX: 'OKX',
  Xverse: 'Xverse',
  Tomo: 'Tomo',
  Bitget: 'Bitget',
} as const;

export type TBtcWalletId = (typeof OBtcWalletId)[keyof typeof OBtcWalletId];

export interface IBtcProviderArgs {
  networkMode?: TNetworkMode;
}

export interface IConnectBtcResponse {
  address: string;
  publicKey: string;
}

export type TConnectBtc = (mode: TNetworkMode) => Promise<IConnectBtcResponse>;

export interface IBtcBalance {
  /**
   * The balance of the address that is not locked by the mempool.
   */
  spendableBalance: number;
  /**
   * The balance of the address that is locked by the
   * mempool and cannot be spent.
   * This balance is deducted from the spendable balance.
   */
  lockedBalance: number;
}
