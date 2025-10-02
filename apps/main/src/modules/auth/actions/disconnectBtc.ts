import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';

import { getBtcProvider } from 'modules/api';

export const {
  useDisconnectBtcMutation,
  endpoints: { disconnectBtc },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnectBtc: build.mutation<null, void>({
      queryFn: queryFnNotifyWrapper<void, never, null>(async () => {
        const provider = await getBtcProvider();
        provider.disconnect();

        return { data: null };
      }),
    }),
  }),
});
