import { TChainId } from 'modules/api';
import {
  ISwapQuoteParams,
  ISwapQuoteResponse,
  getSwapQuote,
} from 'modules/api/sdk/getSwapQuote';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { SwapCacheTags, web3Api } from 'store/web3Api';

type Args = ISwapQuoteParams & { chainId: TChainId };

export const { useGetSwapQuoteQuery, useLazyGetSwapQuoteQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getSwapQuote: build.query<ISwapQuoteResponse, Args>({
        queryFn: queryFnNotifyWrapper<Args, never, ISwapQuoteResponse>(
          async ({ src, dst, amount, chainId }) => {
            const data = await getSwapQuote(chainId, {
              src,
              dst,
              amount,
            });

            return { data };
          },
          error => getExtendedErrorText(error, t('requestError.quoteForSwap')),
        ),
        providesTags: [SwapCacheTags.quote],
      }),
    }),
  });
