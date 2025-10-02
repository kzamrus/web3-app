import { TChainId } from 'modules/api';
import {
  ISwapTrustedRouterResponse,
  getSwapTrustedRouter,
} from 'modules/api/sdk/getSwapTrustedRouter';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { SwapCacheTags, web3Api } from 'store/web3Api';

type Args = TChainId;

export const { useGetSwapTrustedRouterQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwapTrustedRouter: build.query<ISwapTrustedRouterResponse, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, ISwapTrustedRouterResponse>(
        async chainId => {
          const data = await getSwapTrustedRouter(chainId);

          return { data };
        },
        error =>
          getExtendedErrorText(
            error,
            t('requestError.getTrustedRouterForSwap'),
          ),
      ),
      providesTags: [SwapCacheTags.trustedRouter],
    }),
  }),
});
