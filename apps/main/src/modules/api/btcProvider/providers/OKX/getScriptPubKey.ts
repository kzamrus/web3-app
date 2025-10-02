import { getTxData } from '../../common/getTxData';

/**
 * It is used to get the scriptPubKey of the output of the transaction.
 *
 * @param txId Transaction ID from utxo.
 * @param vout Index of the output.
 *
 * @returns ScriptPubKey of the output.
 */
export async function getScriptPubKey(txId: string, vout = 0): Promise<string> {
  const data = await getTxData(txId, 'testnet');
  return data.vout[vout].scriptpubkey;
}
