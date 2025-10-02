type TomoWalletProvider = any;

/**
 * Connect to Tomo wallet.
 *
 * @returns Tomo wallet provider.
 */
export async function tomoConnector(): Promise<TomoWalletProvider> {
  const tomoProvider = getTomoWalletProvider();
  if (!tomoProvider) {
    throw new Error("Tomo wallet isn't installed");
  }

  await tomoProvider.request({
    method: 'eth_requestAccounts',
  });

  return tomoProvider;
}

export function getTomoWalletProvider(): TomoWalletProvider {
  return (window as any).tomo_evm;
}
