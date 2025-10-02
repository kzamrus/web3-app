import { makeStyles } from 'tss-react/mui';

export const useGeoBlockingStyles = makeStyles()(theme => ({
  root: { maxWidth: 760 },
  paper: {
    padding: theme.spacing(5, 2),
  },
  logoWrapper: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: 28,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
}));
