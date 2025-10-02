import {
  IUnstake,
  demoUnstakesByAddress,
  getUnstakesByAddress,
  getWriteProvider,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { DashboardCacheTags, WalletCacheTags, web3Api } from 'store/web3Api';

const isResultEmpty = false;

export const { useGetUnstakeHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getUnstakeHistory: build.query<IUnstake[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IUnstake[]>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: isResultEmpty ? [] : demoUnstakesByAddress };
          }
          const { currentAccount } = await getWriteProvider();

          const data: IUnstake[] = await getUnstakesByAddress(currentAccount);

          return { data };
        },
        error => getExtendedErrorText(error, 'Failed to get unstake history'),
      ),
      providesTags: [
        WalletCacheTags.account,
        DashboardCacheTags.unstakeHistory,
      ],
    }),
  }),
});
