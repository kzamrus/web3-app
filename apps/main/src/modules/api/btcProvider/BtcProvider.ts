import { getBtcBalance } from './common/getBtcBalance';
import { connectBitget, sendTxBitget } from './providers/Bitget';
import { connectOKX, sendTx as sendTxOKX } from './providers/OKX';
import { connectTomo, sendTxTomo } from './providers/Tomo';
import { connectXverse, sendTx as sendTxXverse } from './providers/Xverse';
import {
  IBtcBalance,
  OBtcWalletId,
  TBtcWalletId,
  TConnectBtc,
  TNetworkMode,
} from './types';

export const walletsWithTestnet: Partial<TBtcWalletId>[] = [OBtcWalletId.OKX];

interface IBtcProviderArgs {
  networkMode?: TNetworkMode;
}

const defaultArgs: Required<IBtcProviderArgs> = {
  networkMode: 'testnet',
};

export class BtcProvider {
  private static instance: BtcProvider;

  private readonly networkMode: TNetworkMode;

  public isConnected = false;

  public publicKey?: string;

  public providerId?: TBtcWalletId;

  private _address?: string;

  public get address(): string {
    if (!this._address) {
      throw new Error('Address is not defined');
    }

    return this._address;
  }

  /**
   * Get the instance of the BtcProvider. If the instance does not exist, it will create a new one.
   */
  static getInstance(args?: Partial<IBtcProviderArgs>): BtcProvider {
    if (!BtcProvider.instance) {
      BtcProvider.instance = new BtcProvider(args);
    }

    return BtcProvider.instance;
  }

  private constructor(args?: IBtcProviderArgs) {
    const { networkMode } = { ...defaultArgs, ...args };

    this.networkMode = networkMode;
  }

  /**
   * Connect to the btc provider
   *
   * @param providerId - The provider ID.
   */
  public async connect(providerId: TBtcWalletId): Promise<void> {
    this.ensureTestnetConnection(providerId);
    const connect = this.getBtcConnector(providerId);

    try {
      const response = await connect(this.networkMode);

      this.isConnected = true;
      this._address = response.address;
      this.publicKey = response.publicKey;
      this.providerId = providerId;
    } catch (error) {
      console.error(error);
      throw new Error(`Couldn't connect to the ${providerId} wallet.`);
    }
  }

  private ensureTestnetConnection(providerId: TBtcWalletId): void {
    const isTestnet = this.networkMode === 'testnet';

    const isNotSupportedOnTestnet =
      isTestnet && !walletsWithTestnet.includes(providerId);

    if (isNotSupportedOnTestnet) {
      throw new Error(`${providerId} provider is not supported on testnet.`);
    }
  }

  /**
   * Get the btc connector based on the provider ID.
   *
   * @param providerId - The provider ID.
   *
   * @returns The connector function.
   */
  private getBtcConnector(providerId: TBtcWalletId): TConnectBtc {
    switch (providerId) {
      case OBtcWalletId.Xverse:
        return connectXverse;
      case OBtcWalletId.OKX:
        return connectOKX;
      case OBtcWalletId.Tomo:
        return connectTomo;
      case OBtcWalletId.Bitget:
        return connectBitget;
      default:
        throw new Error(`Provider ${providerId} is not supported.`);
    }
  }

  /**
   * Disconnect from the btc provider
   */
  public disconnect(): void {
    this.isConnected = false;
    this._address = undefined;
    this.publicKey = undefined;
    this.providerId = undefined;
  }

  /**
   * Send a transaction to the specified address.
   *
   * @param to - The address to send the transaction to.
   * @param amount - The amount to send. In BTC.
   *
   * @returns The transaction ID.
   */
  public sendTx(to: string, amount: string): Promise<string> {
    switch (this.providerId) {
      case OBtcWalletId.OKX:
        return sendTxOKX(this.networkMode, this.address, to, amount);
      case OBtcWalletId.Xverse:
        return sendTxXverse(this.networkMode, to, amount);
      case OBtcWalletId.Tomo:
        return sendTxTomo(to, amount);
      case OBtcWalletId.Bitget:
        return sendTxBitget(to, amount);
      default:
        throw new Error(
          `Send transaction is not supported for ${this.providerId} provider.`,
        );
    }
  }

  /**
   * Get the balance of the specified address.
   *
   * @param address - The address to get the balance for.
   *
   * @returns The balance of the address.
   */
  public async getBalance(address?: string): Promise<IBtcBalance> {
    return getBtcBalance(address ?? this.address, this.networkMode);
  }
}
