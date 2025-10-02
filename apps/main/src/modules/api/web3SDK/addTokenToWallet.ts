import { ITokenInfo } from '@ankr.com/provider';

import { ERC20_TOKEN_DECIMALS } from 'modules/common/const';
import { TChainId } from '../chainIDs';
import { TLstToken } from '../tokens';
import { WriteProvider, getReadProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';

export async function addTokenToWallet(
  provider: WriteProvider,
  token: TLstToken,
  chainId: TChainId,
  decimals = ERC20_TOKEN_DECIMALS,
): Promise<boolean> {
  const readProvider = await getReadProvider(chainId);
  const contract = getTokenContract(readProvider, token);
  const symbol: string = await contract.methods.symbol().call();

  const data: ITokenInfo = {
    address: contract.options.address,
    symbol,
    decimals,
    chainId,
  };

  return provider.addTokenToWallet(data);
}
