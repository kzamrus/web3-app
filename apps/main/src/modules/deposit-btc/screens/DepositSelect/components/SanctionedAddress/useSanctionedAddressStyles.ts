import { makeStyles } from 'tss-react/mui';

export const useSanctionedAddressStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),

    padding: theme.spacing(1.75, 1.5),
    marginTop: theme.spacing(3.5),

    backgroundColor: theme.palette.warning.light,
  },

  icon: {
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(18),
    width: '1em',
    height: '1em',
    color: theme.palette.warning.main,
  },

  text: {
    fontSize: theme.typography.pxToRem(14),

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',

      '&:hover': {
        textDecorationStyle: 'dotted',
      },
    },
  },
}));
