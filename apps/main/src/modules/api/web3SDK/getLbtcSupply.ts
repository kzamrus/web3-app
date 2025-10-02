import { TChainId } from '../chainIDs';
import { OLstToken } from '../tokens';
import { fromSatoshi } from '../utils/convertSatoshi';
import { getReadProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';

export async function getLbtcSupply(chainId: TChainId): Promise<number> {
  const provider = await getReadProvider(chainId);

  const tokenContract = getTokenContract(provider, OLstToken.LBTC);

  const balance: bigint = await tokenContract.methods.totalSupply().call();

  return fromSatoshi(balance.toString());
}
