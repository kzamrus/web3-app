import { makeStyles } from 'tss-react/mui';

export const useStakeMethodBoxStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5),
    },
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bolder',
  },

  description: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
  },
}));
