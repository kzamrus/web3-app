import axios from 'axios';
import { getBtcApiConfig } from '../getBtcApiConfig';
import { TNetworkMode } from '../types';
import { handleMempoolApiError } from './handleMempoolApiError';

interface IPrevout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

interface IVin {
  txid: string;
  vout: number;
  prevout: IPrevout;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

interface IVout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

interface IBtcTxStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface IBtcTxData {
  txid: string;
  version: number;
  locktime: number;
  vin: IVin[];
  vout: IVout[];
  size: number;
  weight: number;
  sigops: number;
  fee: number;
  status: IBtcTxStatus;
}

/**
 * Returns the bitcoin transaction data.
 *
 * @docs [response example](https://mempool.space/signet/api/tx/587005c17518645205a555ca671a6459f0cccac628b799abfaae516d5235eddf)
 *
 * @param txId Transaction ID.
 * @param networkMode Network mode.
 *
 * @returns Transaction data.
 */
export async function getTxData(
  txId: string,
  networkMode?: TNetworkMode,
): Promise<IBtcTxData> {
  const { mempoolApiUrl } = getBtcApiConfig(networkMode);
  const url = `${mempoolApiUrl}/api/tx/${txId}`;
  try {
    const { data } = await axios.get<IBtcTxData>(url);
    return data;
  } catch (error) {
    handleMempoolApiError(error);
  }
}
