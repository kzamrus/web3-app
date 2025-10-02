// todo: add types
type XverseProvider = any;

/**
 * @docs https://docs.xverse.app/sats-connect/wallet-providers#xverse-wallet-provider
 *
 * @returns {XverseProvider} return injected XverseProvider
 */
export function getInjectedXverseBtcProvider(): XverseProvider {
  const provider = getXverseBtcProvider();

  if (!provider) {
    throw new Error('Xverse wallet not found');
  }

  return provider as XverseProvider;
}

export function getXverseBtcProvider(): XverseProvider | undefined {
  return (window as any).XverseProviders?.BitcoinProvider;
}
