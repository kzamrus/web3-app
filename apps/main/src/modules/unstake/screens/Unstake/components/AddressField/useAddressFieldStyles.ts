import { makeStyles } from 'tss-react/mui';

export const useAddressFieldStyles = makeStyles()(theme => ({
  input: {
    paddingRight: 160,
  },

  connectWalletBtn: {
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: 0,
    minWidth: 0,
    height: 25,
    lineHeight: 1,
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(13),

    '&:active': {
      transform: 'translateY(calc(-50% + 1px))',
    },

    '&:disabled': {
      opacity: 0.6,
    },
  },
}));
