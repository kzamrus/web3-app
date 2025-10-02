import { lighten } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()(theme => ({
  container: {
    marginTop: 16,
    width: '100%',
    overflow: 'auto',
  },

  thead: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[400],
    fontSize: 16,
    fontWeight: 500,
    background: theme.palette.customMain[200],
    padding: '9px 32px',
    width: '1416px',
    [theme.breakpoints.down('md')]: {
      width: '1416px',
    },

    th: {},

    '& >div': {
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        marginLeft: 5,
      },
    },
  },

  row: {
    background: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    padding: '29px 32px',
    marginTop: 20,
    width: '1416px',
    [theme.breakpoints.down('md')]: {
      width: '1416px',
    },
  },

  cell: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 400,
  },

  protocol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    height: 32,
    borderRadius: 20,
    background: theme.palette.grey[50],
    padding: theme.spacing(0.5, 1.25),
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.pxToRem(14),
  },

  netowrk: {
    display: 'flex',
    alignItems: 'center',
  },

  multiplier: {
    background: theme.palette.customMain[200],
    padding: '2px 12px',
    borderRadius: 20,
    fontSize: 15,
    color: theme.palette.primary.main,
  },

  multiplierEmpty: {
    width: 16,
    height: 1,
    background: theme.palette.grey[900],
  },

  addButton: {
    padding: 0,
    width: 40,
    height: 40,
    background: theme.palette.grey[900],
    color: theme.palette.common.white,

    '&:hover': {
      background: lighten(theme.palette.grey[900], 0.15),
    },

    '& svg': {
      height: 24,
    },
  },
}));
