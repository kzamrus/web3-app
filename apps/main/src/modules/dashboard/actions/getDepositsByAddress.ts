import {
  IDeposit,
  demoDepositsByAddress,
  getDepositsByAddress,
  getWriteProvider,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { DashboardCacheTags, WalletCacheTags, web3Api } from 'store/web3Api';

export const { useGetDepositsByAddressQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDepositsByAddress: build.query<IDeposit[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IDeposit[]>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: demoDepositsByAddress };
          }

          const { currentAccount } = await getWriteProvider();
          const data: IDeposit[] = await getDepositsByAddress(currentAccount);

          return { data };
        },
        error =>
          getExtendedErrorText(error, 'Failed to get deposits by address'),
      ),
      providesTags: [WalletCacheTags.account, DashboardCacheTags.deposits],
    }),
  }),
});
