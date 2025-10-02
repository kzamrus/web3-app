import { makeStyles } from 'tss-react/mui';

export const useHeaderNavMobileStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 320,
    height: '100%',
    padding: theme.spacing(2, 2.5, 3),
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  nav: {
    display: 'grid',
    gap: theme.spacing(1),
    justifyItems: 'start',
    marginBottom: 'auto',
  },

  link: {
    padding: theme.spacing(0.5, 0),
    borderRadius: 8,
    width: '100%',
    justifyContent: 'flex-start',

    '&.active': {
      cursor: 'default',
      color: theme.palette.primary.main,

      '&:active': {
        transform: 'none',
      },
    },
  },
}));
