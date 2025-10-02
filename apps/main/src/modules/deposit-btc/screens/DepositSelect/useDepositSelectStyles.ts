import { makeStyles } from 'tss-react/mui';

export const useDepositSelectStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
  },

  title: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  steps: {
    display: 'grid',
    gap: theme.spacing(4),
    listStyle: 'none',
    margin: 0,
    padding: 0,

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(6),
    },
  },

  step: {
    display: 'grid',
    gap: theme.spacing(1),
    gridTemplateColumns: 'minmax(0, 1fr)',
  },

  addressBox: {
    height: 52,
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[50],
    userSelect: 'none',
  },

  stakeMethods: {
    display: 'grid',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
}));
