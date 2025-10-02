import { TNetworkMode } from 'modules/api/btcProvider/types';
import { IInjectedBtcProvider, IOkxWallet } from './types';

/**
 * [Docs](https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider)
 *
 * @return {IOkxWallet} return injected okxwallet
 */
export function getInjectedOkxBtcProvider(
  mode: TNetworkMode,
): IInjectedBtcProvider {
  const okxwallet = getOkxBtcWallet(mode);

  if (!okxwallet) {
    throw new Error('okxwallet is not injected.');
  }

  return okxwallet;
}

export function getOkxBtcWallet(
  mode: TNetworkMode,
): IInjectedBtcProvider | undefined {
  const okxwallet: IOkxWallet | undefined = (window as any).okxwallet;

  return mode === 'mainnet' ? okxwallet?.bitcoin : okxwallet?.bitcoinSignet;
}
