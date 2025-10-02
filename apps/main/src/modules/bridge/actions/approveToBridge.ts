import { TChainId, getWriteProvider } from 'modules/api';
import { BridgeCacheTags, web3Api } from 'store/web3Api';

import { t } from 'modules/i18n';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { Address } from 'modules/common/types';
import { approveToBridge } from 'modules/api/web3SDK/approveToBridge';

type Args = {
  amount: number;
  fromChain: TChainId;
  spender: Address;
};

export const { useApproveToBridgeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveToBridge: build.mutation<string, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, string>(
        async ({ amount, spender, fromChain }) => {
          const provider = await getWriteProvider();

          await provider.switchNetwork(fromChain);

          const { transactionHash, receiptPromise } = await approveToBridge(
            provider,
            {
              spender,
              amount,
            },
          );
          await receiptPromise;
          return { data: transactionHash };
        },
        error => getExtendedErrorText(error, t('requestError.approveToBridge')),
      ),
      invalidatesTags: [BridgeCacheTags.bridgeAllowance],
    }),
  }),
});
