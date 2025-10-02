import { makeStyles } from 'tss-react/mui';

export const useDepositStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(2, 4),
    padding: theme.spacing(2.5, 2, 3),
    gridTemplateColumns: '1fr auto',

    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      gridTemplateColumns: '140px minmax(100px, 14%) 1fr auto',
      padding: theme.spacing(3, 2),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(3, 4),
    },
  },

  extraCol: {
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '140px minmax(100px, 14%) 1fr auto auto',
    },
  },

  amount: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },

  txHash: {
    display: 'flex',
    gap: theme.spacing(0.75),
    alignItems: 'center',
    color: theme.palette.customMain[700],
    textDecoration: 'none',
    transition: theme.transitions.create('color'),

    '&:hover': {
      color: theme.palette.customMain[900],
    },
  },

  txHashIcon: {
    width: 24,
    height: 24,
  },

  chain: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontWeight: 500,

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },

  chainIcon: {
    fontSize: theme.typography.pxToRem(24),
  },

  status: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.customMain[700],
    fontSize: theme.typography.pxToRem(14),
    gridColumn: '1 / -1',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16),
      gridColumn: 'initial',
    },
  },

  button: {
    minWidth: 130,
    gridColumn: '1 / -1',
    marginTop: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      order: 1,
      gridColumn: 'initial',
      marginTop: 0,
    },
  },
}));
