import { getWriteProvider } from './getWriteProvider';

/**
 * Check if the current network is the expected one. If not, switch to the expected network.
 *
 * @param provider - web3 write provider
 * @returns Promise that resolves when the network is correct
 */
export async function checkNetwork(expectedNetwork: number): Promise<void> {
  const provider = await getWriteProvider();

  if (expectedNetwork === provider.currentChain) {
    return;
  }

  await provider.switchNetwork(expectedNetwork);

  provider.currentChain = expectedNetwork;
}
