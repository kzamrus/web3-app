export interface IInjectedBtcProvider {
  /**
   * @docs https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider#connect
   */
  connect(): Promise<{ address: string; publicKey: string }>;

  getAccounts(): Promise<string[]>;

  /**
   * @docs https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider#getbalance
   */
  getBalance(): Promise<{
    confirmed: number;
    unconfirmed: number;
    total: number;
  }>;

  /**
   * Sings a transaction and returns a signed transaction.
   *
   * @see https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider-signet#signpsbt
   * @param hash - hash of the transaction to sign
   * @param options - options for signing
   * @returns signed transaction
   */
  signPsbt(
    hash: string,
    options: {
      autoFinalized: boolean;
      toSignInputs: {
        index: number;
        address?: string;
        publicKey?: string;
        sighashTypes?: number[];
      }[];
    },
  ): Promise<string>;

  /**
   * Sends a transaction to the network.
   *
   * @docs https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider#send
   *
   * @returns transaction hash
   */
  send(args: {
    from: string;
    to: string;
    value: string;
    satBytes?: string;
    memo?: string;
    memoPos?: number;
  }): Promise<{ txhash: string }>;
}

export interface IOkxWallet {
  bitcoin: IInjectedBtcProvider;
  bitcoinSignet: IInjectedBtcProvider;
}
