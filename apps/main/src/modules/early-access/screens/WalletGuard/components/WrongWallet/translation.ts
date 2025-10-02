import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Wrong Wallet',
    text: 'Your wallet <code>{address}</code> is not the same as the one you used to access the early access program. Please switch to the <code>{accessAddress}</code> wallet to continue.',
    contactUs:
      'If you have any questions, please contact us at <a href={emailLink} target="_blank" rel="norefferer">{email}</a>',
    clearCode: 'Clear code',
  },
};
