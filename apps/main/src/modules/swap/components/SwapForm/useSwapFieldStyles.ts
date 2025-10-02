import { selectClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useSwapFieldStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  fromToken: {
    padding: '16px 20px',
    background: theme.palette.grey[50],
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      padding: '16px 12px',
      alignItems: 'flex-start',
    },
  },

  toToken: {
    padding: '16px 20px',
    background: theme.palette.grey[50],
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      padding: '16px 12px',
      alignItems: 'flex-start',
    },
  },

  exchangeBtn: {
    width: 40,
    height: 40,
    padding: 8,
    border: '2px solid #FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.grey[50],
    marginTop: -13,
    marginBottom: -13,
    zIndex: 0,
    position: 'relative',
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      marginTop: 14,
      marginBottom: 14,
    },
  },

  label: {
    color: theme.palette.grey[400],
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      paddingTop: 4,
    },
  },

  tokenSelectWrapper: {
    gridRow: '1 / 3',
    gridColumn: '2 / 3',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gridRowGap: 8,
    gridColumnGap: 6,
    width: 200,

    '& span': {
      color: theme.palette.grey[200],
      fontWeight: 500,
      fontSize: 13,
      textAlign: 'right',
    },

    [theme.breakpoints.down('md')]: {
      width: 'auto',
      gridRow: 'auto',
    },
  },

  tokenSelect: {
    width: 126,
    marginLeft: 'auto',
    border: 'none',
    background: theme.palette.common.white,
    padding: 8,
    gridRow: '1 / 2',
    gridColumn: '1 / 3',
    minWidth: 126,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    [`.${selectClasses.filled}`]: {
      height: '0 !important',
      padding: '0 !important',
    },
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      minWidth: 0,
    },
  },

  maxBtn: {
    minWidth: 'auto',
    padding: 0,
    lineHeight: '100%',
  },

  amount: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'column',
    input: {
      height: 34,
      padding: 0,
      background: 'none',
      border: 'none',
      color: theme.palette.grey[900],
      fontSize: 28,
    },
    span: {
      color: theme.palette.grey[200],
      fontSize: 13,
      fontWeight: 500,
      marginTop: 2,
    },

    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 3',
      marginTop: 45,

      input: {
        width: '100%',
      },
    },
  },

  tokenSelectIcon: {
    width: 20,
    objectFit: 'contain',
  },

  tokenSelected: {
    display: 'flex',
  },

  balanceAndMax: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },

  toAmount: {
    color: `${theme.palette.common.black} !important`,
  },
}));
