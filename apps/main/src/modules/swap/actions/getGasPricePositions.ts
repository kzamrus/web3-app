import { TChainId } from 'modules/api';
import { ISwapGasResponse, getSwapGas } from 'modules/api/sdk/getSwapGas';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { SwapCacheTags, web3Api } from 'store/web3Api';
import demoGasPricePositions from '../mock/gas';
import { featureConfig } from 'modules/common/featureConfig';
import { t } from 'modules/i18n';

type Args = TChainId;

export const { useGetGasPricePositionsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getGasPricePositions: build.query<ISwapGasResponse, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, ISwapGasResponse>(
        async chainId => {
          if (featureConfig.offlineTesting) {
            return { data: demoGasPricePositions };
          }

          const data = await getSwapGas(chainId);

          return { data };
        },
        error =>
          getExtendedErrorText(
            error,
            t('requestError.getGasPricePositionsForSwap'),
          ),
      ),
      providesTags: [SwapCacheTags.fee],
    }),
  }),
});
