import { makeStyles } from 'tss-react/mui';

export const useBridgeDetailsStyles = makeStyles()(theme => ({
  root: {
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.grey[50],
    borderRadius: 8,
    gap: 20,

    [theme.breakpoints.down('md')]: {
      padding: '16px 12px',
    },
  },

  chainsPair: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    '.chain': {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    '.indicator': {
      width: 24,
      height: 24,
      objectFit: 'contain',
    },

    [theme.breakpoints.down('md')]: {
      gap: 8,
      '.chain span': {
        display: 'none',
      },
      '.indicator': {
        width: 20,
        height: 20,
      },
    },
  },

  amount: {
    display: 'flex',
    alignItems: 'center',
    '.icon': {
      width: 20,
      height: 20,
      objectFit: 'contain',
    },
    '.lbtc': {
      color: theme.palette.grey[900],
    },
    '.usd': {
      color: theme.palette.grey[500],
    },
  },
}));
