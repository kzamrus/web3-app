import { dialogClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useSlippageSettingStyles = makeStyles()(theme => ({
  root: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },

  modal: {
    [`.${dialogClasses.paper}`]: {
      maxWidth: 700,
      padding: '36px 40px 90px 40px',
    },
  },

  buttonGroup: {
    boxShadow: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 143px)',
    gridColumnGap: 16,
    button: {
      background: theme.palette.grey[50],
      borderRadius: 0,
      border: 'unset !important',
      color: theme.palette.grey[400],
      fontsize: 18,
      fontWeight: 500,
      height: 40,

      '&.active': {
        background: theme.palette.common.black,
        color: theme.palette.common.white,
      },
    },

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      button: {
        width: 143,
      },
    },
  },

  title: {
    [theme.breakpoints.down('md')]: {
      whiteSpace: 'nowrap',
    },
  },

  current: {
    borderRadius: 0,
    whiteSpace: 'pre',
    height: 40,
    fontWeight: 500,
    width: 143,
  },

  content: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    padding: 0,
    marginTop: 48,

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  actions: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 0,
  },

  closeBtn: {
    padding: 0,
    minWidth: 'auto',
  },

  autoText: {
    display: 'inline-block',
    color: theme.palette.common.white,
    opacity: 0.5,
    fontWeight: 500,
  },
}));
