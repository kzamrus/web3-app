import { getTVL } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';
import { featureConfig } from '../featureConfig';
import { sleep } from '../utils/sleep';

const DEMO_TVL_PRICE = 55000;

export const { useGetTVLQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTVL: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: DEMO_TVL_PRICE };
          }

          return { data: await getTVL() };
        },
        error => getExtendedErrorText(error, 'Unable to get TVL'),
      ),
    }),
  }),
});
