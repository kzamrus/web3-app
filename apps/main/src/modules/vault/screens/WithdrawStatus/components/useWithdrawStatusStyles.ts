import { makeStyles } from 'tss-react/mui';

export const useWithdrawStatusStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 6, 6),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: '50px',
  },

  item: {
    fontSize: theme.typography.pxToRem(16),
  },

  label: {
    fontWeight: 600,
  },

  quote: {
    position: 'relative',

    marginLeft: '11px',

    fontSize: theme.typography.pxToRem(14),
    lineHeight: 'normal',

    color: theme.palette.grey[900],

    '&::before': {
      content: '""',

      position: 'absolute',
      top: 0,
      left: '-11px',

      width: '3px',
      height: '100%',

      display: 'block',

      borderRadius: '20px',

      backgroundColor: theme.palette.customMain[700],
    },
  },
}));
