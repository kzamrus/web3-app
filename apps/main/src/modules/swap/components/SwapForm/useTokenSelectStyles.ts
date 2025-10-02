import { makeStyles } from 'tss-react/mui';
import { alpha, inputBaseClasses } from '@mui/material';

export const useTokenSelectStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    background: theme.palette.common.white,
    padding: '36px 14px 36px 14px',

    [theme.breakpoints.down('md')]: {
      padding: '48px 12px 0 12px',
    },
  },

  title: {
    color: theme.palette.grey[900],
    fontSize: 48,
    fontWeight: 500,
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      fontSize: 32,
      whiteSpace: 'nowrap',
    },
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  inputContainer: {
    position: 'relative',
    margin: '26px 36px',

    [theme.breakpoints.down('md')]: {
      margin: '16px 0 24px 0',
    },
  },
  iconSearch: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    top: 12,
    left: 16,
    zIndex: 10,

    [theme.breakpoints.down('md')]: {
      width: 24,
      height: 24,
      top: '50%',
      transform: 'translateY(-50%)',
      left: 14,
      svg: {
        width: 24,
        height: 24,
      },
    },
  },
  input: {
    width: '100%',
    height: 52,
    [`.${inputBaseClasses.input}`]: {
      borderRadius: 4,
      position: 'relative',
      fontSize: 16,
      width: '100%',
      padding: '12px 16px',
      textIndent: 40,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&::placeholder': {
        color: theme.palette.grey[400],
      },
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,

        [theme.breakpoints.down('md')]: {
          boxShadow: 'none',
          border: 'none',
        },
      },

      [theme.breakpoints.down('md')]: {
        padding: 0,
        textIndent: 22,
      },
    },

    [theme.breakpoints.down('md')]: {
      padding: '12px 16px',
    },
  },
  tokenSelectItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '20px 36px',

    [theme.breakpoints.down('md')]: {
      padding: '12px 0',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: 6,
    },
  },
  tokenSelect: {
    border: 'none',
    background: theme.palette.common.white,
    padding: 8,
  },
  tokenItemContent: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      height: '100%',
    },
  },
  tokenSymbol: {
    fontSize: 18,

    [theme.breakpoints.down('md')]: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '100%',
    },
  },
  tokenBalance: {
    fontSize: 16,
    color: theme.palette.grey[500],

    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      lineHeight: '100%',
    },
  },
  tokenUsd: {
    marginLeft: 'auto',
    fontSize: 22,

    [theme.breakpoints.down('md')]: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '100%',
      marginLeft: 0,
    },
  },

  tokenSelectIcon: {
    width: 36,
    height: 36,
    marginRight: 10,

    [theme.breakpoints.down('md')]: {
      marginRight: 0,
    },
  },

  buyBtn: {
    height: 60,
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    '& > .MuiButton-endIcon i': {
      color: theme.palette.common.white,
    },
  },
  tokenAvatar: {
    width: 36,
    height: 36,
    marginRight: 10,

    [theme.breakpoints.down('md')]: {
      marginRight: 0,
    },
    background: theme.palette.grey[100],
    color: theme.palette.background.paper,
  },
}));
