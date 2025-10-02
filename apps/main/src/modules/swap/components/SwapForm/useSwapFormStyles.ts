import { makeStyles } from 'tss-react/mui';

export const useSwapFormStyles = makeStyles()(theme => ({
  root: {
    width: 700,
    background: theme.palette.common.white,
    padding: '36px 50px 40px 50px',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '36px 16px',
    },
  },

  title: {
    color: theme.palette.grey[900],
    fontSize: 48,
    fontWeight: 500,
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      fontsize: 32,
      textAlign: 'left',
    },
  },

  swapBtn: {
    height: 60,
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    '& > .MuiButton-endIcon i': {
      color: theme.palette.common.white,
    },
  },
}));
