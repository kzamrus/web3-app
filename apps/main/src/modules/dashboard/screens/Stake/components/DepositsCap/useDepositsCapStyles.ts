import { makeStyles } from 'tss-react/mui';

export const useDepositsCapStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3.5, 4),
    },
  },

  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },

  progressInfo: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.customMain[700],
    marginBottom: theme.spacing(4),
  },

  progressValue: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: theme.spacing(0.5),
    fontWeight: 600,
  },

  progressValueDivider: {
    display: 'inline-block',
    margin: theme.spacing(0, 1),
    border: 'none',
    width: 1,
    height: '1.2em',
    backgroundColor: theme.palette.customMain[200],
  },
}));
