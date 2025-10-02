import { checkNetwork, claimLBTC, getWriteProvider } from 'modules/api';
import { CommonCacheTags, web3Api } from 'store/web3Api';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

type Args = {
  chainId: number;
  data: string;
  proofSignature: string;
};

type Result = string;

/**
 * @deprecated use claim action from dashboard module. This action is only for claiming via flow with manual notarization
 */
export const { useClaimLBTCMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimLBTC: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, Result>(
        async ({ chainId, data, proofSignature }) => {
          await checkNetwork(chainId);

          const provider = await getWriteProvider();

          const { receiptPromise, transactionHash } = await claimLBTC(
            provider,
            data,
            proofSignature,
            true,
          );

          await receiptPromise;

          return { data: transactionHash };
        },
        error => getExtendedErrorText(error, 'Failed to claim LBTC'),
      ),
      invalidatesTags: [CommonCacheTags.evmTokenBalance],
    }),
  }),
});
