import { makeStyles } from 'tss-react/mui';

export const useAmountFieldStyles = makeStyles<{}>()((theme, {}) => ({
  root: {
    padding: '19px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    background: theme.palette.grey[50],

    [theme.breakpoints.down('md')]: {
      padding: '10px 16px',
    },
  },

  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    input: {
      border: 'none',
      background: 'transparent',
      fontSize: 28,
      height: 34,
      lineHeight: 'normal',
      padding: 0,
      color: theme.palette.grey[900],

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    '.the-usd': {
      color: theme.palette.grey[200],
      fontSize: 13,
      fontWeight: 500,
    },
  },

  suffix: {
    gap: 10,
  },

  symbol: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    coin: {
      color: theme.palette.grey[900],
      fontWeight: 400,
      fontSize: 16,
    },
  },

  balance: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    '& span': {
      color: theme.palette.grey[200],
      fontSize: 13,
      fontWeight: 500,
    },
  },

  maxBtn: {
    padding: 0,
    minWidth: 'auto',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 'auto',
  },
}));
