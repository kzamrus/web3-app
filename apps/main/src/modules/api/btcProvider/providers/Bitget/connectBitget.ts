import { IConnectBtcResponse } from '../../types';
import { getBitgetBtcProviderStrict } from './getBitgetBtcProvider';

export async function connectBitget(): Promise<IConnectBtcResponse> {
  const provider = getBitgetBtcProviderStrict();
  const [address] = await provider.requestAccounts();
  const publicKey = await provider.getPublicKey();

  return { address, publicKey };
}
