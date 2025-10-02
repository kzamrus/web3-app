import { TChainId, getLbtcDepositFeeRate } from 'modules/api';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { BridgeCacheTags, web3Api } from 'store/web3Api';

type Args = {
  fromChainId: TChainId;
  toChainId: TChainId;
};

export const { useGetLbtcDepositFeeRateQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLbtcDepositFeeRate: build.query<number, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, number>(
        async ({ fromChainId, toChainId }) => {
          return { data: await getLbtcDepositFeeRate(fromChainId, toChainId) };
        },
        error =>
          getExtendedErrorText(error, t('requestError.getLbtcDepositFee')),
      ),
      providesTags: [BridgeCacheTags.bridgeFee],
    }),
  }),
});
