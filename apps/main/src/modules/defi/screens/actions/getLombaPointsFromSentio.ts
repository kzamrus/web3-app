import retry, { Options } from 'async-retry';
import {
  getLombaPointsFromSentio,
  GetLombaPointsFromSentioReturn,
} from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';

const retryParams: Options = {
  retries: 100,
  minTimeout: 60_000,
};

type Args = {
  address: string | undefined;
};

export const { useGetLombaPointsFromSentioQueryQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getLombaPointsFromSentioQuery: build.query<
        GetLombaPointsFromSentioReturn,
        Args
      >({
        queryFn: queryFnNotifyWrapper<
          Args,
          never,
          GetLombaPointsFromSentioReturn
        >(
          async ({ address }) => ({
            data: await retry(async () => {
              if (address) {
                return getLombaPointsFromSentio(address);
              }
            }, retryParams),
          }),
          error => getExtendedErrorText(error, 'Failed to get Lux'),
        ),
      }),
    }),
  });
