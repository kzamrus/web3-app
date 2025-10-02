import { EthereumHttpWeb3KeyProvider } from '@ankr.com/provider';

export class ReadProvider extends EthereumHttpWeb3KeyProvider {
  constructor(
    url: string,
    public chainId: number,
  ) {
    super(url);
  }
}
