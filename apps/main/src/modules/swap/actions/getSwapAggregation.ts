import BigNumber from 'bignumber.js';
import { TChainId } from 'modules/api';
import { TToken } from 'modules/api/sdk/getSwapAvailableTokens';
import { ISwapQuoteResponse, getSwapQuote } from 'modules/api/sdk/getSwapQuote';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { SwapCacheTags, web3Api } from 'store/web3Api';
import { ETH_STANDARD, ETH_USDC, LBTC_ADDRESS } from '../const';
import { featureConfig } from 'modules/common/featureConfig';
import { sleep } from 'modules/common/utils/sleep';
import demoDstQuote from '../mock/dstQuote.json';
import demoUsdcQuote from '../mock/usdcQuote.json';
import demoGasQuote from '../mock/gasQuote.json';
import { t } from 'modules/i18n';

type Args = {
  srcToken: TToken;
  dstToken: TToken;
  ethToken: TToken;
  chainId: TChainId;
};

type Result = {
  dstAmountData: ISwapQuoteResponse;
  usdcAmountData: ISwapQuoteResponse;
  dstUsdcAmountData: ISwapQuoteResponse;
  gasUSDCAmountData: ISwapQuoteResponse;
};

export type SwapAggregationResult = Result;

const demoResponse: Result = {
  dstAmountData: {
    dstAmount: new BigNumber(demoDstQuote.dstAmount),
    gas: new BigNumber(demoDstQuote.gas),
  },
  usdcAmountData: {
    dstAmount: new BigNumber(demoUsdcQuote.dstAmount),
    gas: new BigNumber(demoUsdcQuote.gas),
  },
  dstUsdcAmountData: {
    dstAmount: new BigNumber(demoUsdcQuote.dstAmount),
    gas: new BigNumber(demoUsdcQuote.gas),
  },
  gasUSDCAmountData: {
    dstAmount: new BigNumber(demoGasQuote.dstAmount),
    gas: new BigNumber(demoGasQuote.gas),
  },
};

export const { useGetSwapAggregationQuery, useLazyGetSwapAggregationQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getSwapAggregation: build.query<Result, Args>({
        queryFn: queryFnNotifyWrapper<Args, never, Result>(
          async ({ srcToken, dstToken, ethToken, chainId }) => {
            if (featureConfig.offlineTesting) {
              await sleep();
              return { data: demoResponse };
            }

            // Cos liquidity of poll not enough
            const isSrcLBTC = srcToken.address === LBTC_ADDRESS;
            const srcAdjustedDecimals = isSrcLBTC
              ? srcToken.decimals / 2
              : srcToken.decimals;
            const srcReversal = isSrcLBTC ? srcToken.decimals / 2 : 0;

            const isDstLBTC = dstToken.address === LBTC_ADDRESS;
            const dstAdjustedDecimals = isDstLBTC
              ? dstToken.decimals / 2
              : dstToken.decimals;
            const dstReversal = isDstLBTC ? dstToken.decimals / 2 : 0;

            const dstAmountData = await getSwapQuote(chainId, {
              src: srcToken.address,
              dst: dstToken.address,
              amount: new BigNumber(1).multipliedBy(10 ** srcAdjustedDecimals),
            });

            const usdcAmountData = await getSwapQuote(chainId, {
              src: srcToken.address,
              dst: ETH_USDC,
              amount: new BigNumber(1).multipliedBy(10 ** srcAdjustedDecimals),
            });

            const dstUsdcAmountData = await getSwapQuote(chainId, {
              src: dstToken.address,
              dst: ETH_USDC,
              amount: new BigNumber(1).multipliedBy(10 ** dstAdjustedDecimals),
            });

            const gasUSDCAmountData = await getSwapQuote(chainId, {
              src: ETH_STANDARD,
              dst: ETH_USDC,
              amount: new BigNumber(1).multipliedBy(10 ** ethToken.decimals),
            });

            return {
              data: {
                dstAmountData: {
                  ...dstAmountData,
                  dstAmount: dstAmountData.dstAmount.multipliedBy(
                    10 ** srcReversal,
                  ),
                },
                usdcAmountData: {
                  ...usdcAmountData,
                  dstAmount: usdcAmountData.dstAmount.multipliedBy(
                    10 ** srcReversal,
                  ),
                },
                dstUsdcAmountData: {
                  ...dstUsdcAmountData,
                  dstAmount: dstUsdcAmountData.dstAmount.multipliedBy(
                    10 ** dstReversal,
                  ),
                },
                gasUSDCAmountData,
              },
            };
          },
          error => getExtendedErrorText(error, t('requestError.quoteForSwap')),
        ),
        providesTags: [SwapCacheTags.quote],
      }),
    }),
  });
