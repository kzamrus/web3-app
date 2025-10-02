import { TChainId } from 'modules/api';
import {
  SwapAvailableTokensData,
  getSwapAvailableTokens,
} from 'modules/api/sdk/getSwapAvailableTokens';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { SwapCacheTags, web3Api } from 'store/web3Api';
import demoTokens from '../mock/tokens.json';
import { LBTC } from '../const';
import { t } from 'modules/i18n';

const demoResponse: SwapAvailableTokensData = demoTokens;

type Args = TChainId;

export const { useGetSwapAvailableTokensQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwapAvailableTokens: build.query<SwapAvailableTokensData, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, SwapAvailableTokensData>(
        async chainId => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: demoResponse };
          }

          const data = await getSwapAvailableTokens(chainId);

          return { data: { tokens: { ...data.tokens, ...LBTC } } };
        },
        error =>
          getExtendedErrorText(error, t('requestError.getTokensForSwap')),
      ),
      providesTags: [SwapCacheTags.availableTokens],
    }),
  }),
});
