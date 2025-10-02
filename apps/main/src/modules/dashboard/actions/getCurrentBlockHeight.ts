import retry from 'async-retry';
import { getCurrentBlockHeight } from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { web3Api } from 'store/web3Api';

const DEMO_BLOCK_HEIGHT = 111;

export const { useGetCurrentBlockHeightQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getCurrentBlockHeight: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: DEMO_BLOCK_HEIGHT };
          }

          return {
            data: await retry(async () => getCurrentBlockHeight(), {
              retries: 2,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, 'Failed to get current block height'),
      ),
    }),
  }),
});
