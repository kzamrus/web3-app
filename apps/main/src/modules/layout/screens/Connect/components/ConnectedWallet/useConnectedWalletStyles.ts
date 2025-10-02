import { makeStyles } from 'tss-react/mui';

export const useConnectedWalletStyles = makeStyles()(theme => ({
  root: {
    height: 40,
    padding: theme.spacing(0, 1.25),
    gap: theme.spacing(1),
    justifyContent: 'flex-start',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },

  active: {},

  walletIcon: {
    display: 'flex',
    fontSize: theme.typography.pxToRem(28),
  },

  tooltipBox: {
    borderRadius: 20,
    width: 288,
    maxWidth: 'none',
    padding: theme.spacing(1, 2, 2),

    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },

  copyButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  copyIcon: {
    width: '1em',
    height: '1em',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 1,
  },

  disconnectButton: {},
}));
