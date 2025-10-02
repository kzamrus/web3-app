import { TNetworkMode } from '../../types';
import { sendTxMainnet } from './sendTxMainnet';
import { sendTxSignet } from './sendTxSignet';

/**
 * Send transaction
 *
 * @param networkMode - network mode
 * @param from - sender address
 * @param to - recipient address
 * @param amount - amount to send
 *
 * @returns transaction hash
 */
export const sendTx = (
  networkMode: TNetworkMode,
  from: string,
  to: string,
  amount: string,
): Promise<string> => {
  return networkMode === 'mainnet'
    ? sendTxMainnet(from, to, amount)
    : sendTxSignet(from, to, amount);
};
