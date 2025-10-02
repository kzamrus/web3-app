import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import { Psbt, initEccLib, networks } from 'bitcoinjs-lib';
import { toSatoshi } from 'modules/api/utils/convertSatoshi';
import { IUtxo, TSatoshi } from '../../common/types';
import { calcBtcTxFee } from './calcBtcTxFee';
import { getFeeRate } from './getFeeRate';
import { getInjectedOkxBtcProvider } from './getInjectedBtcProvider';
import { getScriptPubKey } from './getScriptPubKey';
import { getUtxosByAddress } from './getUtxosByAddress';
import { postSignetTx } from './postSignetTx';

initEccLib(ecc);

const SHOULD_SEND_TX = true;

/**
 * Send transaction to Signet.
 *
 * @docs https://github.com/bitcoinjs/bitcoinjs-lib/tree/v6.1.5/test/integration/transactions.spec.ts#L22
 *
 * @param from - sender address
 * @param to - recipient address
 * @param amount - amount to send
 *
 * @returns Transaction ID.
 */
export async function sendTxSignet(
  from: string,
  to: string,
  amount: string,
): Promise<string> {
  const injectedProvider = getInjectedOkxBtcProvider('testnet');

  console.log(`Start sending tx`, {
    depositAddress: to,
    btcAmount: amount,
    shouldSendTx: SHOULD_SEND_TX,
  });

  const amountToSend = toSatoshi(amount);
  const utxos = await getUtxosByAddress(from);
  console.log('found utxos', utxos.length);

  const { utxosToSpend, overpay } = getUtxosByAmount(utxos, amountToSend);
  console.log('used utxos', utxosToSpend.length);
  console.log('overpay', overpay);

  const withOverpay = overpay > 0;
  const feeRate = await getFeeRate();
  console.log('Fee rate', feeRate);

  const totalInputsToSpend = utxosToSpend.length;
  const totalOutputs = withOverpay ? 2 : 1;
  const fee = calcBtcTxFee(totalInputsToSpend, totalOutputs, feeRate);
  const amountToReturn = overpay - fee;
  console.log('Total fee', fee);
  console.log('Amount to return', amountToReturn);

  // it is a corner case and can be improved
  if (amountToReturn < 0) {
    throw new Error('Not enough funds to pay the fee');
  }

  const psbt = new Psbt({ network: networks.testnet });

  const scritptPubKeyRequests = utxosToSpend.map(utxo =>
    getScriptPubKey(utxo.txid, utxo.vout),
  );

  const scritptPubKeys = await Promise.all(scritptPubKeyRequests);

  utxosToSpend.forEach(async (utxo, index) => {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: Buffer.from(scritptPubKeys[index], 'hex'),
        value: utxo.value,
      },
    });
  });
  console.log('added inputs');

  psbt.addOutput({
    address: to,
    value: amountToSend,
  });

  if (withOverpay) {
    psbt.addOutput({
      address: from,
      value: amountToReturn,
    });
  }
  console.log('added outputs');
  console.log('psbt', psbt);

  const hexPsbt = psbt.toHex();

  console.log('start sign psbt using wallet', { hexPsbt });

  const toSignInputs = utxosToSpend.map((_utxo, index) => ({
    index,
    address: from,
  }));

  const signedTx = await injectedProvider.signPsbt(hexPsbt, {
    autoFinalized: false,
    toSignInputs,
  });

  console.log('Sign result', { signedTx });

  const signedPsbt = Psbt.fromHex(signedTx);
  signedPsbt.finalizeAllInputs();
  const txHex = signedPsbt.extractTransaction().toHex();

  console.log('Finalized txHex', { txHex });

  if (!SHOULD_SEND_TX) {
    throw new Error('Should not send tx');
  }

  return postSignetTx(txHex);
}

/**
 * Get UTXOs by amount to send.
 *
 * @param   {IUtxo[]}  utxos UTXOs to spend.
 * @param   {TSatoshi} amount Amount to send.
 *
 * @returns {object}   UTXOs to spend and overpay.
 */
function getUtxosByAmount(
  utxos: IUtxo[],
  amount: TSatoshi,
): { utxosToSpend: IUtxo[]; overpay: TSatoshi } {
  let total = 0;
  const utxosToSpend = [];

  for (let i = 0; i < utxos.length; i++) {
    const current = utxos[i];

    if (!current.status.confirmed) {
      continue;
    }

    total += current.value;
    utxosToSpend.push(current);

    if (total > amount) {
      break;
    }
  }

  if (total < amount) {
    throw new Error('Not enough funds');
  }

  const overpay = total - amount;

  return {
    utxosToSpend,
    overpay,
  };
}
