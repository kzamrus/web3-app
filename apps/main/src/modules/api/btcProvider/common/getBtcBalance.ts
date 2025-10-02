import axios from 'axios';
import { fromSatoshi } from 'modules/api/utils/convertSatoshi';
import { getBtcApiConfig } from '../getBtcApiConfig';
import { IBtcBalance, TNetworkMode } from '../types';
import { handleMempoolApiError } from './handleMempoolApiError';

interface IMempoolBtcBalance {
  chain_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
  };
  mempool_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
  };
}

/**
 * Requests the balance of the specified bitcoin address.
 *
 * @param address Bitcoin address.
 * @param networkMode Network mode.
 *
 * @returns The balance of the address.
 */
export async function getBtcBalance(
  address: string,
  networkMode?: TNetworkMode,
): Promise<IBtcBalance> {
  const { mempoolApiUrl } = getBtcApiConfig(networkMode);
  const url = `${mempoolApiUrl}/api/address/${address}`;

  try {
    const { data } = await axios.get<IMempoolBtcBalance>(url);
    return mapBtcBalanceResponse(data);
  } catch (error) {
    handleMempoolApiError(error);
  }
}

function mapBtcBalanceResponse(data: IMempoolBtcBalance): IBtcBalance {
  const { chain_stats, mempool_stats } = data;

  const chainBalance =
    chain_stats.funded_txo_sum -
    chain_stats.spent_txo_sum -
    mempool_stats.spent_txo_sum;

  const fundedTxoSum = mempool_stats.funded_txo_sum;

  return {
    spendableBalance: chainBalance > 0 ? fromSatoshi(chainBalance) : 0,
    lockedBalance: fundedTxoSum > 0 ? fromSatoshi(fundedTxoSum) : 0,
  };
}
