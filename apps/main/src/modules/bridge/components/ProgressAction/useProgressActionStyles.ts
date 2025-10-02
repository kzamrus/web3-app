import { makeStyles } from 'tss-react/mui';

export const useProgressActionStyles = makeStyles<{}>()((theme, {}) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    columnGap: 16,
  },
  finished: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },
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
