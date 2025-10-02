import { BrowserProvider } from 'ethers';
import { getWriteProvider } from 'modules/api';

export class VaultProvider extends BrowserProvider {
  private static instance: VaultProvider;

  static async getInstance(): Promise<VaultProvider> {
    if (!VaultProvider.instance) {
      const provider = await getWriteProvider();
      const eip1193Provider = provider.getEIP1193Provider();
      VaultProvider.instance = new BrowserProvider(eip1193Provider);
    }

    return VaultProvider.instance;
  }
}
