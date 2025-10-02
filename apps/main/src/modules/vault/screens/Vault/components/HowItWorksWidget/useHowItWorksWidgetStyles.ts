import { makeStyles } from 'tss-react/mui';

export const useHowItWorksWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
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
    gap: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '351px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    },
  },
  image: {
    height: 110,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: '10px',
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
  },
}));
