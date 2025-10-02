import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';

import { getWriteProvider } from 'modules/api';
import { removeStoredWalletId } from '../utils/storeWalletId';

export const {
  useDisconnectMutation,
  endpoints: { disconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnect: build.mutation<null, void>({
      queryFn: queryFnNotifyWrapper<void, never, null>(async () => {
        const provider = await getWriteProvider();
        provider.disconnect();

        return { data: null };
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        await queryFulfilled;

        removeStoredWalletId();
      },
    }),
  }),
});
