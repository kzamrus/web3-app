import { makeStyles } from 'tss-react/mui';

export const useUnstakeFormStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 6, 6),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  controls: {
    display: 'grid',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(5),
    },
  },
}));
