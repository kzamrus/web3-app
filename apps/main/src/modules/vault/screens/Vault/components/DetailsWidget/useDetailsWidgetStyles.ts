import { makeStyles } from 'tss-react/mui';

export const useDetailsWidgetStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    maxWidth: '340px',
    overflowX: 'auto',
  },
  body: {
    width: 416,
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
  list: {
    width: '100%',
    height: '394px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '300px',
  },
  listItem: {
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0),
    },
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  labelsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  valuesWrapper: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  labels: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5),
    },
  },
  tooltip: {
    marginRight: '5px',
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.grey['200'],
  },
}));
