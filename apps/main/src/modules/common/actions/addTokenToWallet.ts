import {
  TChainId,
  TLstToken,
  addTokenToWallet,
  checkNetwork,
  getWriteProvider,
} from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';
import { BTC_DECIMALS } from '../const';

type Args = {
  token: TLstToken;
  chainId: TChainId;
};

export const { useAddTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addTokenToWallet: build.mutation<boolean, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, boolean>(
        async ({ token, chainId }) => {
          await checkNetwork(chainId);

          const provider = await getWriteProvider();
          // todo: show notification
          return {
            data: await addTokenToWallet(
              provider,
              token,
              chainId,
              BTC_DECIMALS,
            ),
          };
        },
        error => getExtendedErrorText(error, 'Failed to add token to wallet'),
      ),
    }),
  }),
});
