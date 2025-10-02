import { makeStyles } from 'tss-react/mui';

export const usePointsStyles = makeStyles()(theme => ({
  title: {
    fontSize: theme.typography.pxToRem(24),
    marginBottom: theme.spacing(1.25),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },

  text: {
    maxWidth: 573,
    margin: theme.spacing(0, 'auto'),
  },
}));
