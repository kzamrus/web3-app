import { makeStyles } from 'tss-react/mui';

export const useFootnoteStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.75, 2),
  },

  icon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[400],
  },

  text: {
    color: theme.palette.text.secondary,
    alignSelf: 'center',
  },

  link: {
    textDecoration: 'underline',
    lineHeight: 'inherit',
    color: 'inherit',
    verticalAlign: 'baseline',

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
