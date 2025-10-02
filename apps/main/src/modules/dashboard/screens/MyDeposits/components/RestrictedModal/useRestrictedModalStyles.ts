import { makeStyles } from 'tss-react/mui';

export const useRestrictedModalStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 700,
    textAlign: 'center',
    padding: theme.spacing(4, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9, 6, 11),
    },
  },

  icon: {
    width: 48,
    height: 48,

    [theme.breakpoints.up('md')]: {
      width: 64,
      height: 64,
      marginBottom: theme.spacing(2),
    },
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  text: {
    '& a': {
      color: 'inherit',

      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary.main,
      },
    },
  },
}));
