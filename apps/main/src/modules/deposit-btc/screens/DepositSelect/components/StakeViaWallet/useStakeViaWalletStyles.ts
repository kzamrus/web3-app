import { makeStyles } from 'tss-react/mui';

export const useStakeViaWalletStyles = makeStyles()(theme => ({
  wallets: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    gap: theme.spacing(2),
  },

  notSupported: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    border: `1px solid ${theme.palette.customMain[500]}`,
    color: theme.palette.customMain[700],
  },
}));
