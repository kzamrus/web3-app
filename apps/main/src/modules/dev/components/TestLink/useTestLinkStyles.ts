import zIndex from '@mui/material/styles/zIndex';
import { makeStyles } from 'tss-react/mui';

export const useTestLinkStyles = makeStyles()(theme => ({
  root: {
    position: 'fixed',
    zIndex: zIndex.modal,
    left: 0,
    bottom: 0,

    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1),

    background: theme.palette.background.paper,
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      opacity: 0.75,
    },

    '&:hover': {
      [theme.breakpoints.up('md')]: {
        opacity: 1,
      },
    },
  },

  menuLink: {
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));
