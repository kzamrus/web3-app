import { TSatoshi } from '../../common/types';

interface IBitgetBtcProvider {
  sendBitcoin: (recepient: string, amount: TSatoshi) => Promise<string>;
  requestAccounts: () => Promise<string[]>;
  getPublicKey: () => Promise<string>;
}

/**
 * @returns The injected provider.
 */
export function getBitgetBtcProvider(): IBitgetBtcProvider | undefined {
  return (window as any)?.bitkeep?.unisat;
}

/**
 * @returns The injected provider or throws an error if the provider is not installed.
 */
export function getBitgetBtcProviderStrict(): IBitgetBtcProvider {
  const provider = getBitgetBtcProvider();

  if (!provider) {
    throw new Error('Bitget provider is not installed.');
  }

  return provider;
}
