import { IWeb3SendResult } from '@ankr.com/provider';
import { IS_PROD } from 'modules/common/const';
import { getOutputScript } from '../btcProvider';
import { OLstToken } from '../tokens';
import { toSatoshi } from '../utils/convertSatoshi';
import { WriteProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';
import { getGasMultiplier } from './utils/getGasMultiplier';

/**
 * Unstakes LBTC.
 *
 * @param provider - The web3 provider.
 * @param btcAddress - The BTC address to send the LBTC to.
 * @param amount - The amount of LBTC to unstake.
 *
 * @returns transaction promise
 */
export function unstakeLBTC(
  provider: WriteProvider,
  btcAddress: string,
  amount: string,
): Promise<IWeb3SendResult> {
  const tokenContract = getTokenContract(provider, OLstToken.LBTC);

  const outputScript = getOutputScript(
    btcAddress,
    IS_PROD ? 'mainnet' : 'testnet',
  );

  const amountSat = toSatoshi(amount);

  const tx = tokenContract.methods.redeem(outputScript, amountSat);

  return provider.sendTransactionAsync(
    provider.currentAccount,
    tokenContract.options.address,
    {
      data: tx.encodeABI(),
      estimate: true,
      estimateFee: true,
      gasLimitMultiplier: getGasMultiplier(provider.currentChain),
    },
  );
}
