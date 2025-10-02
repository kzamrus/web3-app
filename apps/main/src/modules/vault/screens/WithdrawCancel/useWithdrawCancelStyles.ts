import { makeStyles } from 'tss-react/mui';

export const useWithdrawCancelStyles = makeStyles()(theme => ({
  root: { maxWidth: 800 },
  paper: {
    padding: theme.spacing(5, 7),
  },
  logoWrapper: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: '50px',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    fontSize: theme.typography.pxToRem(100),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      fontSize: theme.typography.pxToRem(100),
    },
  },
  loader: {
    width: '0.5em !important',
    height: '0.5em !important',
    fontSize: theme.typography.pxToRem(60),
    color: theme.palette.customMain[500],

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(100),
    },
  },
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
  close: {
    flexGrow: 1,
    padding: '20px',
    background: theme.palette.customMain[700],
    fontSize: '16px',
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  confirm: {
    flexGrow: 1,
    padding: '20px',
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
