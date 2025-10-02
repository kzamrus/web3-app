import BigNumber from 'bignumber.js';
import {
  OLstToken,
  SUPPORTED_CHAINS,
  TChainId,
  getTokenBalance,
  getWriteProvider,
} from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { CommonCacheTags, WalletCacheTags, web3Api } from 'store/web3Api';
import { ONE, ZERO } from '../const';
import { featureConfig } from '../featureConfig';
import { sleep } from '../utils/sleep';

type Args = void;

interface LbtcBalances {
  total: BigNumber;
  chains: Record<TChainId, BigNumber>;
}

const demoResponse: LbtcBalances = {
  total: SUPPORTED_CHAINS.reduce(acc => acc.plus(ONE), ZERO),
  chains: SUPPORTED_CHAINS.reduce(
    (acc, chainId) => {
      acc[chainId] = ONE;

      return acc;
    },
    {} as Record<TChainId, BigNumber>,
  ),
};

export const { useGetLbtcBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLbtcBalance: build.query<LbtcBalances, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, LbtcBalances>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: demoResponse };
          }

          return { data: await getLbtcBalance() };
        },
        error =>
          getExtendedErrorText(error, 'Unable to get LBTC token balance'),
      ),
      providesTags: [WalletCacheTags.account, CommonCacheTags.lbtcBalance],
    }),
  }),
});

async function getLbtcBalance(): Promise<LbtcBalances> {
  const { currentAccount } = await getWriteProvider();

  const requests = SUPPORTED_CHAINS.map(chainId =>
    getTokenBalance(OLstToken.LBTC, chainId, currentAccount),
  );

  // Using the meethod is appropriate. Even if certain ERC20 contracts cannot read the balance, it should not block other requests.
  const results = await Promise.allSettled(requests);

  const balances = SUPPORTED_CHAINS.reduce(
    (acc, chainId, index) => {
      if (results[index].status === 'fulfilled') {
        acc[chainId] = (results[index] as any).value as BigNumber;
      } else {
        acc[chainId] = ZERO;
      }
      return acc;
    },
    {} as Record<TChainId, BigNumber>,
  );

  const total = SUPPORTED_CHAINS.reduce(
    (acc, chainId) => acc.plus(balances[chainId]),
    ZERO,
  );

  return {
    total,
    chains: balances,
  };
}
