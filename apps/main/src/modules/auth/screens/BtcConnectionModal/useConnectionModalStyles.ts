import { makeStyles } from 'tss-react/mui';

export const useConnectionModalStyles = makeStyles()(theme => ({
  paper: {
    padding: theme.spacing(6, 2, 4),
    maxWidth: 720,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 16, 6),
    },
  },
}));
