import { makeStyles } from 'tss-react/mui';

export const useWrongWalletStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 7, 6),
    },
  },

  title: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },

  content: {
    maxWidth: 520,
    margin: '0 auto',
    marginBottom: '40px',
  },

  text: {
    wordBreak: 'break-word',

    '& code': {
      display: 'inline-block',
      backgroundColor: theme.palette.grey[50],
      fontSize: '0.8em',
      padding: '0 0.4em',
    },

    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));
