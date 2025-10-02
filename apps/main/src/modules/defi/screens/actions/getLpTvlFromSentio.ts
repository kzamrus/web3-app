import retry, { Options } from 'async-retry';
import { getLpTvlFromSentio, OProtocol } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

type Args = { protocol: OProtocol };

export const { useGetLpTvlFromSentioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLpTvlFromSentio: build.query<number, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, number>(
        async ({ protocol }) => ({
          data: await retry(() => getLpTvlFromSentio(protocol), retryParams),
        }),
        error => getExtendedErrorText(error, 'Failed to get lp tvl'),
      ),
    }),
  }),
});
