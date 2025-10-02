import { makeStyles } from 'tss-react/mui';

export const useSendActionStyles = makeStyles<{}>()((theme, {}) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    columnGap: 16,
  },
  blackbtn: {
    height: 60,
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    '& > .MuiButton-endIcon i': {
      color: theme.palette.common.white,
    },
  },
  turquoisebtn: {
    height: 60,
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.common.white,
    background: theme.palette.customMain[700],
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
}));
