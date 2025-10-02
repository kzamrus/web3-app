import { getBtcProvider, TBtcWalletId } from 'modules/api';
import { CommonCacheTags, web3Api } from 'store/web3Api';

import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { closeDialog, selectDialogState } from 'modules/dialogs';
import { RootState } from 'store';
import {
  BTC_CONNECTION_CACHE_KEY,
  BTC_WALLET_CONNECT_DIALOG_ID,
} from '../const';

export interface IBtcConnect {
  isActive: boolean;
  address?: string;
  walletId?: TBtcWalletId;
}

type ConnectArgs = TBtcWalletId | undefined;

export const {
  useConnectBtcMutation,
  endpoints: { connectBtc },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectBtc: build.mutation<IBtcConnect, ConnectArgs>({
      queryFn: queryFnNotifyWrapper<ConnectArgs, void, IBtcConnect>(
        async providerId => {
          const provider = await getBtcProvider(providerId);

          const data: IBtcConnect = {
            address: provider.address,
            isActive: provider.isConnected,
            walletId: provider.providerId,
          };

          return { data };
        },
      ),
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        return queryFulfilled.then(() => {
          const state = getState() as RootState;
          const { currentModal } = selectDialogState(state);

          if (currentModal === BTC_WALLET_CONNECT_DIALOG_ID) {
            dispatch(closeDialog());
          }
        });
      },
      invalidatesTags: [CommonCacheTags.btcBalance],
    }),
  }),
});

export const selectBtcConnect = connectBtc.select({
  fixedCacheKey: BTC_CONNECTION_CACHE_KEY,
  requestId: undefined,
});
