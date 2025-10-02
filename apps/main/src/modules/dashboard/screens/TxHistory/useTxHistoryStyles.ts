import { makeStyles } from 'tss-react/mui';

export const useTxHistoryStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(6),
  },

  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      fontSize: 38,
    },
  },

  paper: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5),
    },
  },
}));
