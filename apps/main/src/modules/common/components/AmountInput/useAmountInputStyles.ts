import { makeStyles } from 'tss-react/mui';

export const useAmountInputStyles = makeStyles()(theme => ({
  labelBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },

  label: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
  },

  balance: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
  },

  balanceSkeleton: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },

  inputBox: {
    position: 'relative',
  },

  input: {
    height: 60,
    paddingRight: theme.spacing(12),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
  },

  maxButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    textTransform: 'uppercase',
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
