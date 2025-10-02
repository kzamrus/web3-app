import { makeStyles } from 'tss-react/mui';

export const useLbtcAmountStyles = makeStyles()(theme => ({
  root: {
    minHeight: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2, 2.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 4, 4),
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  amount: {
    fontWeight: 500,
    lineHeight: 1.2,
    fontSize: theme.typography.pxToRem(40),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(62),
    },
  },

  amountToken: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(28),
    },
  },

  amountInfo: {
    color: theme.palette.customMain[500],
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(18),
  },
}));
