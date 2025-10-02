import { TChainId, getWriteProvider } from 'modules/api';
import {
  ISwapApprovalCalldataParams,
  ISwapApprovalCalldataResponse,
  getSwapApprovalCalldata,
} from 'modules/api/sdk/getSwapApprovalCalldata';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { web3Api } from 'store/web3Api';

type Args = ISwapApprovalCalldataParams;

export const {
  useGetSwapApprovalCalldataQuery,
  useLazyGetSwapApprovalCalldataQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwapApprovalCalldata: build.query<ISwapApprovalCalldataResponse, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, ISwapApprovalCalldataResponse>(
        async params => {
          const provider = await getWriteProvider();

          const data = await getSwapApprovalCalldata(
            provider.currentChain as TChainId,
            params,
          );

          return { data };
        },
        error =>
          getExtendedErrorText(
            error,
            t('requestError.buildApprovalCalldataForSwap'),
          ),
      ),
    }),
  }),
});
