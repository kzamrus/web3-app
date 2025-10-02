import { makeStyles } from 'tss-react/mui';

export const useEarlyAccessStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(5, 2),
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },

  form: {
    maxWidth: 440,
    margin: '0 auto',
  },

  input: {
    marginBottom: theme.spacing(4),

    backgroundColor: theme.palette.grey[50],
    border: 'none',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(24),
  },

  error: {
    marginTop: theme.spacing(2.5),
    color: theme.palette.error.main,
    textAlign: 'center',
  },
}));
