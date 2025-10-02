import { makeStyles } from 'tss-react/mui';

export const useHistoryTabsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  tab: {
    borderRadius: 0,
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.grey[400],

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      color: theme.palette.text.primary,
    },
  },

  tabActive: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,

    '&:hover': {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.common.white,
      cursor: 'default',
      transform: 'none',
    },
  },
}));
