import { TChainId } from 'modules/api';
import {
  TokenUsdBalances,
  get1inchTokenPrices,
} from 'modules/api/sdk/get1inchTokenPrices';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { SwapCacheTags, web3Api } from 'store/web3Api';
import demoTokenBalances from '../mock/tokenBalances.json';
import { t } from 'modules/i18n';

type Args = {
  chain: TChainId;
  address?: string;
};

export const { useGet1inchTokenPricesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    get1inchTokenPrices: build.query<TokenUsdBalances, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, TokenUsdBalances>(
        async ({ address, chain }) => {
          if (featureConfig.offlineTesting) {
            return { data: demoTokenBalances };
          }

          const data = await get1inchTokenPrices(chain, address);

          return { data };
        },
        error =>
          getExtendedErrorText(error, t('requestError.tokenPricesForSwap')),
      ),
      providesTags: [SwapCacheTags.balance],
    }),
  }),
});
