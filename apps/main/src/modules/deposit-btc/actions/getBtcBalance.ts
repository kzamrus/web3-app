import { getBtcProvider, IBtcBalance } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { CommonCacheTags, web3Api } from 'store/web3Api';
import { featureConfig } from '../../common/featureConfig';
import { sleep } from '../../common/utils/sleep';

const demoBtcBalance: IBtcBalance = {
  spendableBalance: 0.1,
  lockedBalance: 0.2,
};

export const { useGetBtcBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBtcBalance: build.query<IBtcBalance, void>({
      queryFn: queryFnNotifyWrapper<void, never, IBtcBalance>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return {
              data: demoBtcBalance,
            };
          }

          const provider = await getBtcProvider();

          return {
            data: await provider.getBalance(),
          };
        },
        error => getExtendedErrorText(error, 'Unable to get BTC balance data'),
      ),
      providesTags: [CommonCacheTags.btcBalance],
    }),
  }),
});
