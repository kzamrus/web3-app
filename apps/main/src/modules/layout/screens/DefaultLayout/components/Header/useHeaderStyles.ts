import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(1, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5, 0),
    },
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    justifyItems: 'baseline',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr auto auto',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'auto 1fr auto',
      gap: theme.spacing(6),
    },
  },

  logo: {
    height: 22,

    [theme.breakpoints.up('md')]: {
      height: 28,
    },
  },

  buttons: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifySelf: 'end',
    },
  },

  menuToggle: {
    display: 'flex',

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  menuIcon: {
    width: 28,
    height: 28,
    color: theme.palette.text.primary,
  },
}));
