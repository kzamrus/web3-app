import { EVENTS, getProvider, ProviderEvents } from '@ankr.com/provider';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { numberToHex } from 'web3-utils';

import { RootState } from 'store';

import { getWriteProvider } from 'modules/api';
import { connect, selectConnect } from './actions/connect';
import { disconnect } from './actions/disconnect';
import { disconnectBtc } from './actions/disconnectBtc';
import { switchNetwork } from './actions/switchNetwork';
import { BTC_CONNECTION_CACHE_KEY, CONNECTION_CACHE_KEY } from './const';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: action => {
    return !!connect?.matchFulfilled(action);
  },

  effect: async (_action, api) => {
    api.cancelActiveListeners();

    const ethWeb3KeyProvider = await getWriteProvider();
    const web3 = ethWeb3KeyProvider.getWeb3();
    const eventProvider = getProvider(web3?.currentProvider);

    if (eventProvider === null) return;

    EVENTS.forEach(eventName => {
      if (typeof eventProvider.removeAllListeners === 'function') {
        eventProvider.removeAllListeners(eventName);
      }
    });

    eventProvider.on(ProviderEvents.AccountsChanged, async (data: string[]) => {
      const state = api.getState() as RootState;
      const { data: connectionData } = selectConnect(state);

      if (!connectionData?.isActive) return;

      const currentAddress = data.length ? data[0] : undefined;

      // After clicking on the "lock" button in the MetaMask extension,
      // the event is triggered with an empty array. And in this case,
      // we need to disconnect the user.
      if (!currentAddress) {
        const disconnectThunk = disconnect.initiate(undefined, {
          fixedCacheKey: CONNECTION_CACHE_KEY,
        });

        const result = api.dispatch(disconnectThunk);
        result.reset();

        const disconnectBtcThunk = disconnectBtc.initiate(undefined, {
          fixedCacheKey: BTC_CONNECTION_CACHE_KEY,
        });

        const btcResult = api.dispatch(disconnectBtcThunk);
        btcResult.reset();
      } else {
        const provider = await getWriteProvider();

        // todo: move this logic to the provider
        provider.currentAccount = currentAddress;

        const connectThunk = connect.initiate(undefined, {
          fixedCacheKey: CONNECTION_CACHE_KEY,
        });

        await api.dispatch(connectThunk);
      }
    });

    eventProvider.on(ProviderEvents.ChainChanged, data => {
      const state = api.getState() as RootState;
      const { data: connectionData } = selectConnect(state);

      if (!connectionData?.isActive) return;

      const chainId = data.toString().startsWith('0x')
        ? data
        : numberToHex(data);

      const selectedChainId = Number.parseInt(chainId, 16);

      const switchNetworkThunk = switchNetwork.initiate(selectedChainId);
      console.log('chainChanged', selectedChainId);

      const result = api.dispatch(switchNetworkThunk);
      result.reset();
    });
  },
});
