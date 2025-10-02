import { makeStyles } from 'tss-react/mui';

export const useStakeBtcWithWalletStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 11, 7.5),
    },
  },

  title: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  summary: {
    margin: theme.spacing(4, 0),
  },

  submit: {
    display: 'flex',
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    },
  },
}));
