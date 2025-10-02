import { makeStyles } from 'tss-react/mui';

export const useStakeFBTCStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: theme.spacing(-5, 0, 2),
    },
  },

  text: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),

    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  icon: {
    height: 24,
    marginRight: theme.spacing(0.5),
  },
}));
