import retry, { Options } from 'async-retry';
import { getLpApyFromSentio } from 'modules/api';
import { web3Api } from 'store/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

export const { useGetLpApyFromSentioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLpApyFromSentio: build.query<null, null>({
      queryFn: queryFnNotifyWrapper<null, never, null>(
        async () => ({
          data: await retry(async () => getLpApyFromSentio(), retryParams),
        }),
        error => getExtendedErrorText(error, 'Failed to get lp apy'),
      ),
    }),
  }),
});
