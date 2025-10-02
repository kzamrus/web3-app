import { makeStyles } from 'tss-react/mui';

export const useStakeButtonStyles = makeStyles()(theme => ({
  button: {
    padding: theme.spacing(1.5),
    minWidth: 0,
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
  },

  icon: {
    fontSize: 28,
  },

  iconDisabled: {
    filter: 'grayscale(100%)',
    opacity: 0.7,
  },
}));
