import { TChainId, getWriteProvider } from 'modules/api';
import {
  ISwapCalldataParams,
  ISwapCalldataResponse,
  getSwapCalldata,
} from 'modules/api/sdk/getSwapCalldata';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { web3Api } from 'store/web3Api';

type Args = ISwapCalldataParams;

export const { useGetSwapCalldataQuery, useLazyGetSwapCalldataQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getSwapCalldata: build.query<ISwapCalldataResponse, Args>({
        queryFn: queryFnNotifyWrapper<Args, never, ISwapCalldataResponse>(
          async params => {
            const provider = await getWriteProvider();

            const data = await getSwapCalldata(
              provider.currentChain as TChainId,
              params,
            );

            return { data };
          },
          error =>
            getExtendedErrorText(error, t('requestError.buildSwapCalldata')),
        ),
      }),
    }),
  });
