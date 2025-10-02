import { OChainId, TChainId } from 'modules/api';
import { Locale } from './locales';

const chainTranslation: Record<TChainId, string> = {
  [OChainId.ethereum]: 'Ethereum',
  [OChainId.holesky]: 'Holesky',
  [OChainId.unsupported]: 'Unsupported network',
  [OChainId.mantle]: 'Mantle',
  [OChainId.okxXLayer]: 'OKX (X-Layer)',
  [OChainId.okxXLayerTestnet]: 'OKX (X-Layer Testnet)',
  [OChainId.manta]: 'Manta',
  [OChainId.scroll]: 'Scroll',
  [OChainId.linea]: 'Linea',
  [OChainId.lineaSepolia]: 'Linea Sepolia',
  [OChainId.mantleSepolia]: 'Mantle Sepolia',
  [OChainId.zircuit]: 'Zircuit',
};

export const globalTranslation = {
  [Locale.en]: {
    appName: 'LombardFinance',
    format: {
      date: '{value, date, medium}',
      timeShort: '{value, time, short}',
      numberCompact: '{value, number, ::compact-short}',
    },
    unit: {
      usdValue: '${value}',
      pctValue: '{value}%',
      tokenValue: '{value} {token}',
    },
    wallets: {
      confirmTxn: 'Please confirm the transaction in your wallet.',
    },
    requestError: {
      switchNetwork: 'Failed to switch network.',
      approveToBridge: 'Failed to approve LBTC to bridge',
      depositToBridge: 'Failed to deposit LBTC to bridge',
      getBridgeData: 'Unable to get bridge data',
      getEstimateFee: 'Unable to get estimate fee',
      getLbtcAllowance: 'Unable to get LBTC allowance',
      getLbtcDepositFee: 'Unable to get LBTC deposit fee rate',
      notarizeTx: 'Unable to notarize tx which deposit to bridge',
      withdrawFromBridge: 'Failed to withdraw LBTC from bridge',
      approveForSwap: 'Failed to approve for swap',
      switchChainForSwap: 'Failed to switch chain',
      tokenPricesForSwap:
        'Failed to get the prices list of swap token from 1inch',
      quoteForSwap: 'Failed to quote for swap tokens from 1inch',
      buildApprovalCalldataForSwap:
        'Failed to build the approval tx data from 1inch',
      buildSwapCalldata: 'Failed to build the swap tx data from 1inch',
      getTokensForSwap: 'Failed to get the swap available tokens from 1inch',
      getGasPricePositionsForSwap:
        'Failed to get the gas price positions of swap from 1inch',
      getTrustedRouterForSwap: 'Failed to get swap trusted router',
      swap: 'Failed to swap',
    },
    chain: chainTranslation,
    validation: {
      required: 'This field is required',
      numberOnly: 'Must be a number',
      min: 'Should be at least {value}',
      max: 'Should be less than {value}',
      email: 'Invalid email address',
      address: 'Invalid address',
      lowBalance: 'Your balance is not sufficient',
    },
  },
};
