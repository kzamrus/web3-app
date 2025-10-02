import { makeStyles } from 'tss-react/mui';

export const useCloseBtnStyles = makeStyles()(theme => ({
  root: {
    position: 'absolute',
    width: 36,
    height: 36,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('all'),

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  icon: {
    width: 24,
    height: 24,
  },
}));
