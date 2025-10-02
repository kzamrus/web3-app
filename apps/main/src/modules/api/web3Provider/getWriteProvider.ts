import { WriteProvider } from './WriteProvider';
import { providerOptions } from './connectors/providerOptions';

export async function getWriteProvider(
  walletId?: string,
): Promise<WriteProvider> {
  const provider = WriteProvider.getInstance();

  if (!provider.isConnected()) {
    await provider.inject(walletId, providerOptions);
    await provider.connect();
  }

  return provider;
}
