import BigNumber from 'bignumber.js';
import { ETH_SCALE, SATOSHI_SCALE } from 'modules/common/const';
import { TChainId } from '../chainIDs';
import { OLstToken, TLstToken } from '../tokens';
import { getReadProvider } from '../web3Provider';
import { convertFromWei } from './utils/convertFromWei';
import { getTokenContract } from './utils/getContract';

/**
 * Requests token balance.
 *
 * @param token - token to get balance for.
 * @param chainId - chain id.
 * @param userAddress - user address.
 * @param scale - scale to convert balance to.
 *
 * @returns converted token balance.
 */
export async function getTokenBalance(
  token: TLstToken,
  chainId: TChainId,
  userAddress: string,
): Promise<BigNumber> {
  const provider = await getReadProvider(chainId);
  const tokenContract = getTokenContract(provider, token);
  const balance: string = await tokenContract.methods
    .balanceOf(userAddress)
    .call();
  const scale = getDecimalsByToken(token);

  return convertFromWei(balance.toString(), scale);
}

const getDecimalsByToken = (token: TLstToken): number => {
  switch (token) {
    case OLstToken.LBTC:
      return SATOSHI_SCALE;
    case OLstToken.WBTC:
      return SATOSHI_SCALE;
    default:
      return ETH_SCALE;
  }
};
