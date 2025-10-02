import { getReadProvider, OChainId, TChainId } from 'modules/api';
import { web3Api } from 'store/web3Api';
import { FMT_NUMBER, TransactionReceiptAPI } from 'web3-types';
import { DEFAULT_RETURN_FORMAT } from 'web3-types';

interface IUseGetTxReceiptQueryArgs {
  txHash: string;
  chainId?: TChainId;
}

// TODO test since web3.js upgrade
export const {
  useGetTxReceiptQuery,
  endpoints: { getTxReceipt },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxReceipt: build.query<
      TransactionReceiptAPI | null,
      IUseGetTxReceiptQueryArgs
    >({
      queryFn: async ({ txHash, chainId = OChainId.ethereum }) => {
        const provider = await getReadProvider(chainId);
        const web3 = provider.getWeb3();

        try {
          const receipt: TransactionReceiptAPI =
            await web3.eth.getTransactionReceipt(txHash, {
              ...DEFAULT_RETURN_FORMAT,
              number: FMT_NUMBER.STR,
            });

          if (!receipt) {
            return { data: null };
          }

          return { data: receipt };
        } catch (err) {
          return { data: null };
        }
      },
    }),
  }),
});
