import { makeStyles } from 'tss-react/mui';

export const useSuccessfulRegistrationStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(4, 2),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 7, 6),
    },
  },

  icon: {
    display: 'block',
    margin: theme.spacing(0, 'auto', 2),
    fontSize: theme.typography.pxToRem(40),
    lineHeight: 1,

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(70),
    },
  },

  title: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(40),
    },
  },

  button: {
    display: 'flex',
    maxWidth: 355,
    margin: theme.spacing(3, 'auto', 0),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    },
  },
}));
