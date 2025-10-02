import { TChainId, depositToBridge, getWriteProvider } from 'modules/api';
import { CommonCacheTags, web3Api } from 'store/web3Api';
import { t } from 'modules/i18n';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { Address } from 'modules/common/types';

type Args = {
  toChain: TChainId;
  amount: number;
  toAddress: Address;
};

export const { useDepositToBridgeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    depositToBridge: build.mutation<string, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, string>(
        async ({ toChain, amount, toAddress }) => {
          const provider = await getWriteProvider();

          const { transactionHash, receiptPromise } = await depositToBridge(
            provider,
            {
              toChain,
              toAddress,
              amount,
            },
          );
          await receiptPromise;
          return { data: transactionHash };
        },
        error => getExtendedErrorText(error, t('requestError.depositToBridge')),
      ),
      invalidatesTags: [
        CommonCacheTags.evmTokenBalance,
        CommonCacheTags.lbtcBalance,
      ],
    }),
  }),
});
