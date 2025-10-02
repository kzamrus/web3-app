import BigNumber from 'bignumber.js';
import { getReadProvider, OLstToken, TChainId } from 'modules/api';
import { getTokenContract } from 'modules/api/web3SDK/utils/getContract';
import { ETH_DECIMALS, ZERO } from 'modules/common/const';
import { Address } from 'modules/common/types';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';
import { web3Api } from 'store/web3Api';

type Args = {
  address: Address;
  fromChain: TChainId;
  toChain: TChainId;
};
const MockAmount = 0;
export const { useGetEstimateFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getEstimateFee: build.query<BigNumber, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, BigNumber>(
        async ({ address, fromChain, toChain }) => {
          if (!address || !toChain) return { data: ZERO };

          const provider = await getReadProvider(fromChain);
          const tokenContract = getTokenContract(provider, OLstToken.LBTC);
          const mockTx = tokenContract.methods.depositToBridge(
            toChain,
            address,
            MockAmount,
          );
          const tx = {
            from: address,
            to: tokenContract.options.address,
            data: mockTx.encodeABI(),
          };
          try {
            const gasPrice = await provider.getWeb3().eth.getGasPrice();
            const estimateGasLimit = await provider
              .getWeb3()
              .eth.estimateGas(tx);
            const fee = new BigNumber(estimateGasLimit.toString(10))
              .multipliedBy(gasPrice.toString(10))
              .dividedBy(10 ** ETH_DECIMALS);

            return {
              data: fee,
            };
          } catch (e) {
            console.error(e);
            return { data: 0 };
          }
        },
        error => getExtendedErrorText(error, t('requestError.getEstimateFee')),
      ),
    }),
  }),
});
