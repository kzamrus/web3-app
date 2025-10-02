import retry, { Options } from 'async-retry';
import { INotarizeOutput, notarizeOutput } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

export const { useNotarizeOutputQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    notarizeOutput: build.query<INotarizeOutput, string>({
      queryFn: queryFnNotifyWrapper<string, never, INotarizeOutput>(
        async txHash => ({
          data: await retry(async () => notarizeOutput(txHash), retryParams),
        }),
        error => getExtendedErrorText(error, 'Unable to notarize deposit'),
      ),
    }),
  }),
});
