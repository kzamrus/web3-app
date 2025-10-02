import { makeStyles } from 'tss-react/mui';

export const useConnectBtnStyles = makeStyles()(theme => ({
  root: {
    height: 52,
    fontWeight: 500,
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(16),

    [theme.breakpoints.up('md')]: {
      height: 40,
    },
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
    color: theme.palette.customMain[800],
  },
}));
