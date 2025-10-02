import { EarlyAccessCacheTags, web3Api } from 'store/web3Api';

import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { getEarlyAccessData } from '../api/getEarlyAccessData';
import { setAccessCode } from '../utils/storeAccessCode';

export const ACCESS_CODE_CACHE_KEY = 'submitCode';

const { useSubmitCodeMutation, endpoints } = web3Api.injectEndpoints({
  endpoints: build => ({
    submitCode: build.mutation<boolean, string>({
      queryFn: queryFnNotifyWrapper<string, void, boolean>(
        async code => {
          if (featureConfig.offlineTesting) {
            await sleep();
            setAccessCode(code);
            return { data: true };
          }

          await getEarlyAccessData(code);
          setAccessCode(code);

          return { data: true };
        },
        error => getExtendedErrorText(error, 'Access error'),
      ),
      invalidatesTags: [EarlyAccessCacheTags.accessData],
    }),
  }),
});

const selectSubmitCode = endpoints.submitCode.select({
  fixedCacheKey: ACCESS_CODE_CACHE_KEY,
  requestId: undefined,
});

export { selectSubmitCode, useSubmitCodeMutation };
