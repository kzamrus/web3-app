import { makeStyles } from 'tss-react/mui';

export const useAppBannerStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.customMain[700],
    color: theme.palette.common.white,
    padding: theme.spacing(1, 0),

    fontSize: theme.typography.pxToRem(14),
  },

  link: {
    color: 'inherit',
    textDecoration: 'underline',

    '&:hover': {
      color: 'inherit',
      textDecoration: 'dotted underline',
    },
  },
}));
