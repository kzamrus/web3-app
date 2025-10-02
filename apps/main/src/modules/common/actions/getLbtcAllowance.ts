import BigNumber from 'bignumber.js';
import { TChainId, getReadProvider } from 'modules/api';
import { getLbtcAllowance } from 'modules/api/web3SDK/getLbtcAllowance';
import { Address } from 'modules/common/types';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { CommonCacheTags, web3Api } from 'store/web3Api';

type Args = {
  address: Address;
  spender: Address;
  chainId: TChainId;
};

export const { useGetLbtcAllowanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLbtcAllowance: build.query<BigNumber, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, BigNumber>(
        async ({ address, spender, chainId }) => {
          const provider = await getReadProvider(chainId);

          return {
            data: await getLbtcAllowance(provider, { address, spender }),
          };
        },
        error =>
          getExtendedErrorText(error, t('requestError.getLbtcAllowance')),
      ),
      providesTags: [CommonCacheTags.lbtcAllowance],
    }),
  }),
});
