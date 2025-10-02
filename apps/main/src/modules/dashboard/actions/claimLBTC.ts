import { checkNetwork, claimLBTC, getWriteProvider } from 'modules/api';
import { CommonCacheTags, DashboardCacheTags, web3Api } from 'store/web3Api';

import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';

const DEMO_TX_HASH =
  '0x344672d01761460a4ce020ad97324a7ca06ee168b00bec4638d394bba299e003';

type Args = {
  chainId: number;
  data: string;
  proofSignature: string;
};

export const { useClaimLBTCMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimLBTC: build.mutation<string, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, string>(
        async ({ chainId, data, proofSignature }) => {
          if (featureConfig.offlineTesting) {
            await sleep(3_000);
            return {
              data: DEMO_TX_HASH,
            };
          }

          await checkNetwork(chainId);

          const provider = await getWriteProvider();

          const { transactionHash } = await claimLBTC(
            provider,
            data,
            proofSignature,
          );

          return { data: transactionHash };
        },
        error => getExtendedErrorText(error, 'Failed to claim LBTC'),
      ),
      invalidatesTags: [
        CommonCacheTags.evmTokenBalance,
        DashboardCacheTags.deposits,
      ],
    }),
  }),
});
