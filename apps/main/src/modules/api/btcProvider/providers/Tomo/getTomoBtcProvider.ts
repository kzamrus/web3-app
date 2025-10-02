export type TTomoBtcNetwork = 'testnet' | 'signet' | 'mainnet';

interface ITomoBtcProvider {
  requestAccounts: () => Promise<string[]>;
  /**
   * Send Tomo BTC to the specified address.
   *
   * @param to - Recipient address.
   * @param amount - Amount to send in Satoshi.
   *
   * @returns Transaction hash.
   */
  sendBitcoin: (to: string, amount: number) => Promise<string>;
  getPublicKey: () => Promise<string>;
  switchNetwork: (network: TTomoBtcNetwork) => Promise<string>;
}

/**
 * @returns Tomo BTC provider.
 */
export function getTomoBtcProvider(): ITomoBtcProvider | undefined {
  return (window as any).tomo_btc;
}
