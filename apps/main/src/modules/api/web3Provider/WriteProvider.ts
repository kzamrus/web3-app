import { EthereumWeb3KeyProvider } from '@ankr.com/provider';
import { SimpleProvider } from 'web3-types';
import { EthExecutionAPI } from 'web3-types';

export class WriteProvider extends EthereumWeb3KeyProvider {
  private static instance: WriteProvider;

  static getInstance(): WriteProvider {
    if (!WriteProvider.instance) {
      WriteProvider.instance = new WriteProvider();
    }

    return WriteProvider.instance;
  }

  public getEIP1193Provider() {
    return this.provider as SimpleProvider<EthExecutionAPI>;
  }
}
