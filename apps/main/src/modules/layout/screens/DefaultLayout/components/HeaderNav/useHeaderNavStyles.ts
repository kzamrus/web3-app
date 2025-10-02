import { makeStyles } from 'tss-react/mui';

export const useHeaderNavStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(3),
    },
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
    padding: theme.spacing(1, 1),
    borderRadius: 8,

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&.active': {
      cursor: 'default',
      color: theme.palette.primary.main,

      '&:active': {
        transform: 'none',
      },
    },
  },
}));
