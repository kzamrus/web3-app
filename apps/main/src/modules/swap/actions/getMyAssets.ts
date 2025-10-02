import { Address } from '@ankr.com/provider';
import { TChainId } from 'modules/api';
import {
  ISwapTokenBalanceResponse,
  getSwapTokenBalance,
} from 'modules/api/sdk/getSwapTokenBalance';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { SwapCacheTags, web3Api } from 'store/web3Api';
import demoBalances from '../mock/balances.json';

type Args = {
  walletAddress: Address;
  spender: Address;
  chainId: TChainId;
  version: any;
};

export const { useGetMyAssetsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMyAssets: build.query<ISwapTokenBalanceResponse[], Args>({
      queryFn: queryFnNotifyWrapper<Args, never, ISwapTokenBalanceResponse[]>(
        async ({ spender, walletAddress, chainId }) => {
          if (featureConfig.offlineTesting) {
            return { data: demoBalances };
          }

          const data = await getSwapTokenBalance(
            chainId,
            walletAddress,
            spender,
          );

          return { data };
        },
        error =>
          getExtendedErrorText(error, 'Failed to get swap token balance'),
      ),
      providesTags: [SwapCacheTags.tokensWithBalance],
    }),
  }),
});
