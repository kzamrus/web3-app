import { alpha, inputBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useBridgeFinishStyles = makeStyles()(theme => ({
  root: {
    width: 800,
    background: theme.palette.common.white,
    paddingTop: 40,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 50,
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '36px 16px',
    },
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  closeIcon: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    cursor: 'pointer',
  },

  title: {
    fontWeight: 500,
    fontSize: 48,
    fontFamily: theme.typography.h1.fontFamily,
    margin: 0,
    lineHeight: '60px',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      fontSize: 32,
      lineHeight: '126%',
    },
  },

  prompt: {
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',
    paddingTop: 12,
    margin: 0,
    whiteSpace: 'pre',

    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      lineHeight: '20px',
      padding: '8px 0 20px 0',
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
    },
  },

  chainSelect: {},

  chainSelectOption: {
    '& svg': {
      width: 24,
      height: 24,
      objectFit: 'contain',
    },
  },

  blackbtn: {
    height: 60,
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    '& > .MuiButton-endIcon i': {
      color: theme.palette.common.white,
    },
  },

  input: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    [`.${inputBaseClasses.input}`]: {
      borderRadius: 4,
      position: 'relative',
      fontSize: 16,
      width: '100%',
      padding: '20.5px 16px',
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
      },
    },
  },
}));
