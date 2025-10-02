import { makeStyles } from 'tss-react/mui';

export const useTxStatusStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(5, 2, 4),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 6, 7.5),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  description: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  rows: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  row: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5, 0),
    },

    '&:first-of-type': {
      paddingTop: 0,
    },

    '&:last-of-type': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },

  rowValue: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));
