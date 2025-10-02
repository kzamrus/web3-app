import { WriteProvider } from '../web3Provider';

/**
 * Sign a message with the current account.
 *
 * @param provider The provider to use for signing.
 * @param message The message to sign.
 *
 * @returns The signature of the message.
 */
export async function signMessage(
  provider: WriteProvider,
  message: string,
): Promise<string> {
  const messageHex = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

  const web3 = provider.getWeb3();
  const ethereum = web3.currentProvider as any;

  return ethereum.request({
    method: 'personal_sign',
    params: [messageHex, provider.currentAccount],
  });
}
