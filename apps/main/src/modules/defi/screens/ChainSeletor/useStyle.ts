import { makeStyles } from 'tss-react/mui';
export const usePointsStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',

    color: '#161719',
    marginTop: 40,
    fontSize: 18,
    fontWeight: 500,
  },

  list: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
    background: theme.palette.background.paper,
    marginRight: 10,
    padding: '9px 10px',
    cursor: 'pointer',
    '& > svg': {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    '& > div': {
      background: theme.palette.background.paper,
      display: 'flex',
      marginRight: '10px',
    },
  },
  select: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
    },
  },
  chainSelect: {
    width: '100%',
    background: theme.palette.background.paper,
    borderColor: theme.palette.grey[100],
    '&::before': {
      borderBottom: 'none !important',
    },
  },
  chainSelectOption: {},
  'item-active': {
    background: theme.palette.text.primary,
    color: theme.palette.background.paper,
  },
}));
