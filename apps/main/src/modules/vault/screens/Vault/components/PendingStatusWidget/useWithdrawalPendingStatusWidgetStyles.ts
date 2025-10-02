import { makeStyles } from 'tss-react/mui';

export const useWithdrawalPendingStatusWidgetStyles = makeStyles()(theme => ({
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
    height: '100%',
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
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    color: '#4C5054',
  },
  value: {},
  description: {
    fontSize: 18,
    textAlign: 'left',
  },
  row: {
    display: 'flex',
    gap: 5,
  },
  button: {
    color: theme.palette.text.primary,
    border: '1px solid',
  },
  lastStep: {
    paddingTop: '23px',
  },
}));
