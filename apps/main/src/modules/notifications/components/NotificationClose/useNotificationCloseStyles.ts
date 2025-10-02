import { makeStyles } from 'tss-react/mui';

export const useNotificationCloseStyles = makeStyles()(theme => ({
  root: {
    border: 'none',
    fontSize: 14,
    color: 'inherit',
    transition: 'color 0.2s',
    padding: theme.spacing(1),

    '&:hover': {
      color: 'inherit',
    },
  },

  placementTopRight: {
    margin: theme.spacing(-1.25, -1.25, -1, 0),
  },

  icon: {
    width: '1em',
    height: '1em',
    fontSize: 20,
  },
}));
