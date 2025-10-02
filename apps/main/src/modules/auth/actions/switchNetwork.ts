import { EEthereumNetworkId } from '@ankr.com/provider';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { web3Api } from 'store/web3Api';

import { getWriteProvider } from 'modules/api';
import { CONNECTION_CACHE_KEY } from '../const';
import { connect } from './connect';

export const {
  useSwitchNetworkMutation,
  endpoints: { switchNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => {
    return {
      switchNetwork: build.mutation<EEthereumNetworkId, EEthereumNetworkId>({
        queryFn: queryFnNotifyWrapper<
          EEthereumNetworkId,
          never,
          EEthereumNetworkId
        >(
          async chainId => {
            const provider = await getWriteProvider();

            await provider.switchNetwork(chainId);

            // todo: move this logic to the provider
            provider.currentChain = chainId;

            return { data: chainId };
          },
          error => getExtendedErrorText(error, t('requestError.switchNetwork')),
        ),

        onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
          return queryFulfilled.then(async () => {
            const connectThunk = connect.initiate(undefined, {
              fixedCacheKey: CONNECTION_CACHE_KEY,
            });

            await dispatch(connectThunk);
          });
        },
      }),
    };
  },
});
