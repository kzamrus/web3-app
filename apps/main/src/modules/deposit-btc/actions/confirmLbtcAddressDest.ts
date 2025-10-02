import {
  TChainId,
  checkNetwork,
  generateDepositBtcAddress,
  getWriteProvider,
  signLbtcDestionationAddr,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { DepositCacheTags, web3Api } from 'store/web3Api';
import { updateDepositBtcAddressQueryData } from './getDepositBtcAddress';

type Args = TChainId;
type Result = string;

export const { useConfirmLbtcAddressDestMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    confirmLbtcAddressDest: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, Result>(
        async chainId => {
          await checkNetwork(chainId);

          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: 'fake_address' };
          }

          const provider = await getWriteProvider();
          const message = await signLbtcDestionationAddr(provider, chainId);

          const address = await generateDepositBtcAddress(
            provider.currentAccount,
            chainId,
            message,
          );

          return { data: address };
        },
        error =>
          getExtendedErrorText(
            error,
            'Unable to confirm LBTC destination address',
          ),
      ),
      onQueryStarted: async (chainId, { queryFulfilled, dispatch }) => {
        try {
          const { data: generatedAddress } = await queryFulfilled;

          const thunk = updateDepositBtcAddressQueryData(
            'getDepositBtcAddress',
            chainId,
            generatedAddress,
          );

          dispatch(thunk);
        } catch {
          web3Api.util.invalidateTags([DepositCacheTags.depositAddress]);
        }
      },
    }),
  }),
});
