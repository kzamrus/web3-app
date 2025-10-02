import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Bridge',
    moveLBTC:
      'Move your LBTC for low-cost between chains without third-party bridges, by making a transaction on both the From and To blockchain',
    fee: 'Fee',
    receive: 'You will receive',
    finish: 'Finish Bridge',
    amountRequired: 'Please input amount',
    amountInsufficient: 'Insufficient funds',
    amountTooSmall: 'Amount is too small, at least {min}',
    gasPrompt:
      'You will need a small gas fee of ~{gas} {symbol} (native {net} token) to claim',
  },
};
