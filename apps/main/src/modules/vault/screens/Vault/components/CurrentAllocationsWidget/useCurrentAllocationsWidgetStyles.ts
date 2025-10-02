import { makeStyles } from 'tss-react/mui';

export const useCurrentAllocationsWidgetStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    position: 'relative',
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
  cell: {
    height: '64px',
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  headerCell: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
  },
  table: {
    height: '100%',
  },
  container: {
    height: '394px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  paper: {
    minWidth: 416,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5),
    },
  },
  scrollContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      overflowX: 'scroll',
      position: 'relative',
    },
  },
}));
