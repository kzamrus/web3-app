import { getInjectedOkxBtcProvider } from './getInjectedBtcProvider';

/**
 * It is used to send a transaction to the mainnet.
 *
 * @docs https://www.okx.com/ru/web3/build/docs/sdks/chains/bitcoin/provider#send
 *
 * @param from - sender address
 * @param to - recipient address
 * @param amount - amount to send
 *
 * @returns transaction hash
 */
export async function sendTxMainnet(
  from: string,
  to: string,
  amount: string,
): Promise<string> {
  const injectedProvider = getInjectedOkxBtcProvider('mainnet');

  const { txhash } = await injectedProvider.send({
    from,
    to,
    value: amount,
  });

  return txhash;
}
