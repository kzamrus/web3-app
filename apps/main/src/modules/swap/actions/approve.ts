import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { CommonCacheTags, web3Api } from 'store/web3Api';

import { getWriteProvider } from 'modules/api';
import { Address, ISendOptions, IWeb3SendResult } from '@ankr.com/provider';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { t } from 'modules/i18n';

type Args = {
  from: Address;
  to: Address;
  sendOptions: ISendOptions;
};

type Result = IWeb3SendResult;

export const { useApproveMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approve: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, Result>(
        async ({ from, to, sendOptions }) => {
          const provider = await getWriteProvider();

          const { transactionHash, receiptPromise } =
            await provider.sendTransactionAsync(from, to, {
              ...sendOptions,
              estimate: true,
              estimateFee: true,
              gasLimitMultiplier: 1.5,
            });

          await receiptPromise;

          return { data: transactionHash };
        },
        error => getExtendedErrorText(error, t('requestError.approveForSwap')),
      ),
      invalidatesTags: [CommonCacheTags.lbtcAllowance],
    }),
  }),
});
