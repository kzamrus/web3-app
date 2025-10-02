import {
  SANCTIONED_ADDRESS,
  TChainId,
  getDepositBtcAddress,
  getWriteProvider,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { Address } from 'modules/common/types';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { DepositCacheTags, WalletCacheTags, web3Api } from 'store/web3Api';

const FAKE_DEPOSIT_BTC_ADDRESS = featureConfig.isWalletWithSanctions
  ? SANCTIONED_ADDRESS
  : 'fake_bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';

type Args = TChainId;
type Result = Address | null;

export const {
  useGetDepositBtcAddressQuery,
  util: { upsertQueryData: updateDepositBtcAddressQueryData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getDepositBtcAddress: build.query<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, Result>(
        async chainId => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: FAKE_DEPOSIT_BTC_ADDRESS };
          }

          const provider = await getWriteProvider();

          try {
            const data = await getDepositBtcAddress(
              provider.currentAccount,
              chainId,
            );

            return { data };
          } catch (error) {
            return { data: null };
          }
        },
        error =>
          getExtendedErrorText(error, 'Failed to get BTC deposit address'),
      ),
      providesTags: [WalletCacheTags.account, DepositCacheTags.depositAddress],
    }),
  }),
});
