import { OLstToken, TChainId } from 'modules/api';
import { getTokenAddress } from 'modules/api/web3SDK/utils/getTokenAddress';

export const getTokenAddressFallback = (chainId: number, tokenSymbol?: any) => {
  try {
    if (!chainId) {
      return;
    }

    const tokenAddress = getTokenAddress(
      chainId as TChainId,
      tokenSymbol ?? OLstToken.LBTC,
    );
    return tokenAddress;
  } catch (error) {
    console.error(error);
  }
};
