import retry, { Options } from 'async-retry';
import { getHoldTimeFromSentio, getAvgHoldTimeFromSentio } from 'modules/api';
import { web3Api } from 'store/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

type Args = {
  address: string | undefined;
};
export const { useGetHoldTimeFromSentioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getHoldTimeFromSentio: build.query<number, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, number>(
        async ({ address }) => ({
          data: await retry(async () => {
            if (address) {
              return getHoldTimeFromSentio(address);
            }
          }, retryParams),
        }),
        error => getExtendedErrorText(error, 'Failed to get hold time'),
      ),
    }),
  }),
});

export const { useGetAvgHoldTimeFromSentioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAvgHoldTimeFromSentio: build.query<number, null>({
      queryFn: queryFnNotifyWrapper<null, never, number>(
        async () => ({
          data: await retry(async () => {
            return getAvgHoldTimeFromSentio();
          }, retryParams),
        }),
        error => getExtendedErrorText(error, 'Failed to get hold time'),
      ),
    }),
  }),
});
