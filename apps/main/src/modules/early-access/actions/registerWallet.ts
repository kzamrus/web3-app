import { EarlyAccessCacheTags, web3Api } from 'store/web3Api';

import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { openDialog } from 'modules/dialogs';
import { registerWallet } from '../api/registerWallet';
import { SUCCESSFUL_ACCESS_MODAL_ID } from '../hooks/useSuccessfulAccessModal';

export const REGISTER_WALLET_CACHE_KEY = 'registerWallet';

interface IRegisterWalletParams {
  wallet: string;
  code: string;
}

export const {
  useRegisterWalletMutation,
  endpoints: { registerWallet: registerWalletAction },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    registerWallet: build.mutation<boolean, IRegisterWalletParams>({
      queryFn: queryFnNotifyWrapper<IRegisterWalletParams, never, boolean>(
        async ({ wallet, code }) => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: true };
          }

          return {
            data: await registerWallet(wallet, code),
          };
        },
        error => getExtendedErrorText(error, 'Failed to register wallet'),
      ),
      onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
        return queryFulfilled.then(() => {
          dispatch(
            openDialog({
              currentModal: SUCCESSFUL_ACCESS_MODAL_ID,
            }),
          );
        });
      },
      invalidatesTags: [EarlyAccessCacheTags.accessData],
    }),
  }),
});
