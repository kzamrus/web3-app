import { makeStyles } from 'tss-react/mui';

export const useExternalLinkStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.secondary,

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  icon: {
    width: '1em',
    height: '1em',
    fontSize: 20,
    transition: theme.transitions.create('color'),
  },
}));
