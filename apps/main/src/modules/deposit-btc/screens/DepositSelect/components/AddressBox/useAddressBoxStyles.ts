import { makeStyles } from 'tss-react/mui';

export const useAddressBoxStyles = makeStyles()(theme => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    height: 60,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2),
  },

  value: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },

  skeleton: {
    width: '100%',
  },
}));
