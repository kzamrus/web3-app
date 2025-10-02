import { makeStyles } from 'tss-react/mui';

export const useConnectionStyles = makeStyles()(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },

  buttons: {
    display: 'grid',
    gap: theme.spacing(2),
  },

  text: {
    maxWidth: 426,
    margin: theme.spacing(3, 'auto', 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
  },

  checkbox: {
    margin: theme.spacing(0, 0, 2, '-9px'),

    '& a': {
      color: theme.palette.customMain[700],
      textDecoration: 'none',
      fontWeight: 500,

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));
