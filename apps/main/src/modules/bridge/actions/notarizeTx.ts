import retry, { Options } from 'async-retry';
import { INotarizeTx, notarizeTx } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { web3Api } from 'store/web3Api';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

type Args = {
  txHash: string;
  chainId: number;
};

export const { useNotarizeTxQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    notarizeTx: build.query<INotarizeTx, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, INotarizeTx>(
        async ({ txHash, chainId }) => ({
          data: await retry(
            async () => notarizeTx(txHash, chainId),
            retryParams,
          ),
        }),
        error => getExtendedErrorText(error, t('requestError.notarizeTx')),
      ),
    }),
  }),
});
