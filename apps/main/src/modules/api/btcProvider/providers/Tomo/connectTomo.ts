import { IConnectBtcResponse } from '../../types';
import { getTomoBtcProvider } from './getTomoBtcProvider';

export async function connectTomo(): Promise<IConnectBtcResponse> {
  const provider = getTomoBtcProvider();

  if (!provider) {
    throw new Error('Tomo BTC provider is not found');
  }

  const [address] = await provider.requestAccounts();
  const publicKey = await provider.getPublicKey();

  return {
    address,
    publicKey,
  };
}
