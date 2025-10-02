import { PLAYFAIR_DISPLAY_FONT_FAMILY } from 'modules/themes';
import { makeStyles } from 'tss-react/mui';

export const useStrategyDescriptionWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
  },
  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
    fontSize: 28,

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  plot: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  listItem: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5),
    },
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '321px',
    textAlign: 'left',
  },
  image: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontWeight: '500',
  },
  description: {
    textAlign: 'left',
  },
}));
