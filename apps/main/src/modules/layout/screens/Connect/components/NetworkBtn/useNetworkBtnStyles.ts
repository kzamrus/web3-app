import { makeStyles } from 'tss-react/mui';

export const useNetworkBtnStyles = makeStyles()(theme => ({
  root: {
    height: 40,
    padding: theme.spacing(0, 1.25),
    justifyContent: 'flex-start',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },

    '&:disabled': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.common.white,
    },
  },

  rightPadding: {
    paddingRight: theme.spacing(3),
  },
}));
