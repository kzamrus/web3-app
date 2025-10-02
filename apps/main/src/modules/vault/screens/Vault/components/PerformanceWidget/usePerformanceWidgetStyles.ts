import { makeStyles } from 'tss-react/mui';

export const usePerformanceWidgetStyles = makeStyles()(theme => ({
  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: 28,

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 341,
    [theme.breakpoints.down('sm')]: {
      height: 328,
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5),
    },
  },
}));
