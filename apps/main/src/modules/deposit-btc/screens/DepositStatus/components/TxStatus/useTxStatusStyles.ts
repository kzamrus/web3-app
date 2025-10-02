import { makeStyles } from 'tss-react/mui';

export const useTxStatusStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(5, 2, 4),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 11, 7.5),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  description: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  txIdRow: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  txId: {
    marginLeft: 'auto',
  },

  backButton: {
    display: 'flex',
    marginTop: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7.5),
    },
  },
}));
