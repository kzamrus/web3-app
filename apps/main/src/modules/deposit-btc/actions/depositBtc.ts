import { CommonCacheTags, DashboardCacheTags, web3Api } from 'store/web3Api';

import { getBtcProvider } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

type Args = { amount: number | string; depositAddress: string };
type Result = string;

export const { useDepositBtcMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    depositBtc: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, Result>(
        async ({ amount, depositAddress }) => {
          const provider = await getBtcProvider();
          return {
            data: await provider.sendTx(depositAddress, amount.toString()),
          };
        },
        error => getExtendedErrorText(error, 'Failed to deposit BTC'),
      ),
      invalidatesTags: [
        CommonCacheTags.btcBalance,
        DashboardCacheTags.deposits,
      ],
    }),
  }),
});
