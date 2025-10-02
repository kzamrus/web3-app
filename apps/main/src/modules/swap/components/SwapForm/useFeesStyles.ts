import { makeStyles } from 'tss-react/mui';

export const useFeesStyles = makeStyles()(theme => ({
  root: {
    background: theme.palette.grey[50],
    borderRadius: 6,
    padding: '18px 20px 16px 20px',

    [theme.breakpoints.down('md')]: {
      padding: '16px 12px',
    },
  },

  calculation: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 6,
    '.amount': {
      color: theme.palette.grey[900],
      fontSize: 13,
      fontWeight: 500,
    },
    '.usd': {
      color: theme.palette.grey[600],
      fontSize: 13,
      fontWeight: 500,
      marginLeft: 4,
    },
    '.gas': {
      color: theme.palette.customMain[800],
      fontSize: 13,
      fontWeight: 500,
      flex: 1,
      textAlign: 'right',
    },

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      '.gas': {
        paddingTop: 12,
        flexBasis: '100%',
        textAlign: 'left',
      },
    },
  },

  toggleBtn: {
    padding: 0,
    '&:hover': {
      background: 'unset !important',
    },
  },

  toggleIcon: {
    '&.unfold': {
      transition: 'transform 0.2s',
      transform: 'rotate(0deg)',
    },
    '&.shrink': {
      transition: 'transform 0.2s',
      transform: 'rotate(180deg)',
    },
  },

  feeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p:first-of-type': {
      color: theme.palette.grey[400],
      fontSize: 13,
      fontWeight: 500,
    },
    '& p:last-of-type': {
      color: theme.palette.grey[900],
      fontSize: 13,
      fontWeight: 500,
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: 8,
    },
  },

  feeList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 18,
    marginTop: 18,

    [theme.breakpoints.down('md')]: {
      marginTop: 24,
    },
  },
}));
