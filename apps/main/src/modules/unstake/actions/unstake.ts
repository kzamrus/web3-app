import { CommonCacheTags, web3Api } from 'store/web3Api';

import {
  TChainId,
  checkNetwork,
  getWriteProvider,
  unstakeLBTC,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';

type Args = { amount: string; address: string; chainId: TChainId };
type Result = string;

const demoResponse: Result =
  '0x53f957b5797be7fe801a60fe035521727a8d34b870f1d1f87000fdfb1fc18bc8';

export const { useUnstakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstake: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, Result>(
        async ({ amount, address, chainId }) => {
          await checkNetwork(chainId);

          if (featureConfig.offlineTesting) {
            await sleep();
            if (!confirm('Demo unstake requested. Confirm?')) {
              throw new Error('Unstake cancelled');
            }
            return { data: demoResponse };
          }

          const provider = await getWriteProvider();

          const { transactionHash } = await unstakeLBTC(
            provider,
            address,
            amount,
          );

          return {
            data: transactionHash,
          };
        },
        error => getExtendedErrorText(error, 'Failed to unstake LBTC'),
      ),
      invalidatesTags: [
        CommonCacheTags.btcBalance,
        CommonCacheTags.lbtcBalance,
      ],
    }),
  }),
});
