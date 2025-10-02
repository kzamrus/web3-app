import { makeStyles } from 'tss-react/mui';

export const useConnectDialogStyles = makeStyles()(theme => ({
  paper: {
    padding: theme.spacing(4, 2, 4),
    maxWidth: 700,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 7.5, 7.5),
    },
  },
}));
