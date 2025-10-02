import BigNumber from 'bignumber.js';
import {
  TChainId,
  TLstToken,
  getTokenBalance,
  getWriteProvider,
} from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { CommonCacheTags, WalletCacheTags, web3Api } from 'store/web3Api';

type Args = {
  token: TLstToken;
  chainId: TChainId;
};

type Result = BigNumber;

export const { useGetTokenBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTokenBalance: build.query<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, Result>(
        async ({ chainId, token }) => {
          const { currentAccount } = await getWriteProvider();

          return {
            data: await getTokenBalance(token, chainId, currentAccount),
          };
        },
        error => getExtendedErrorText(error, 'Unable to get EVM token balance'),
      ),
      providesTags: [WalletCacheTags.account, CommonCacheTags.evmTokenBalance],
    }),
  }),
});
