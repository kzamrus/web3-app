import { EarlyAccessCacheTags, web3Api } from 'store/web3Api';

import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import {
  IEarlyAccessData,
  demoSubmitCodeResponse,
  getEarlyAccessData,
} from '../api/getEarlyAccessData';
import { getAccessCode, removeAccessCode } from '../utils/storeAccessCode';

type Result = IEarlyAccessData | null;

let count = 0;

const { useGetEarlyAccessDataQuery, endpoints } = web3Api.injectEndpoints({
  endpoints: build => ({
    getEarlyAccessData: build.query<Result, void>({
      queryFn: queryFnNotifyWrapper<void, never, Result>(
        async () => {
          const code = getAccessCode();

          if (!code) {
            return { data: null };
          }

          if (featureConfig.offlineTesting) {
            count++;
            await sleep();
            const data = { ...demoSubmitCodeResponse };

            if (count < 2) {
              data.wallet = undefined;
            }

            return { data };
          }

          return { data: await getEarlyAccessData(code) };
        },
        error => getExtendedErrorText(error, 'Failed to get early access data'),
      ),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.catch(() => {
          removeAccessCode();
        });
      },
      providesTags: [EarlyAccessCacheTags.accessData],
    }),
  }),
});

const selectEarlyAccessData = endpoints.getEarlyAccessData.select;

export { selectEarlyAccessData, useGetEarlyAccessDataQuery };
