import { dialogClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useMobileTokenSelectStyles = makeStyles()(theme => ({
  modal: {
    [`.${dialogClasses.paper}`]: {
      width: '100%',
      padding: 20,
      height: 680,
      maxHeight: '90vh',
      overflow: 'hidden',
      margin: 16,
    },
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
}));
