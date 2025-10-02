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

type Token = keyof typeof OLstToken;

type Args = { token: Token };

interface WbtcBalances {
  total: BigNumber;
  chains: Record<TChainId, BigNumber>;
}

const demoResponse: WbtcBalances = {
  total: SUPPORTED_CHAINS.reduce(acc => acc.plus(ONE), ZERO),
  chains: SUPPORTED_CHAINS.reduce(
    (acc, chainId) => {
      acc[chainId] = ONE;

      return acc;
    },
    {} as Record<TChainId, BigNumber>,
  ),
};

export const { useGetTokenBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTokenBalance: build.query<WbtcBalances, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, WbtcBalances>(
        async (args: Args) => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: demoResponse };
          }

          return { data: await getRequestTokenBalance(args.token) };
        },
        error => getExtendedErrorText(error, `Unable to get token balance`),
      ),
      providesTags: [WalletCacheTags.account, CommonCacheTags.lbtcBalance],
    }),
  }),
});

async function getRequestTokenBalance(token: Token): Promise<WbtcBalances> {
  const { currentAccount } = await getWriteProvider();

  const requests = SUPPORTED_CHAINS.map(chainId =>
    getTokenBalance(token, chainId, currentAccount),
  );

  const results = await Promise.allSettled(requests);

  const balances = SUPPORTED_CHAINS.reduce(
    (acc, chainId, index) => {
      if (results[index].status === 'fulfilled') {
        acc[chainId] = (
          results[index] as PromiseFulfilledResult<BigNumber>
        ).value;
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
