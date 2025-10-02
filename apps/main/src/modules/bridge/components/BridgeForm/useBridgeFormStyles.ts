import { makeStyles } from 'tss-react/mui';

export const useBridgeFormStyles = makeStyles<{}>()((theme, {}) => ({
  root: {
    width: 800,
    minHeight: 720,
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
      textAlign: 'left',
    },
  },

  finishBridgeBtn: {
    borderRadius: 30,
    border: `1px solid ${theme.palette.customMain[500]}`,
    fontSize: 13,
    lineHeight: 'normal',
    padding: '7px 12px',
    position: 'absolute',
    top: 24,
    right: 24,

    [theme.breakpoints.down('md')]: {
      top: 16,
      right: 16,
    },
  },

  moveLbtcPrompt: {
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',
    paddingTop: 18,
    paddingBottom: 32,
    margin: 0,

    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      lineHeight: '20px',
      textAlign: 'left',
      padding: '8px 0 32px 0',
    },
  },

  gasPrompt: {
    fontSize: 12,
    lineHeight: '20px',
    color: theme.palette.grey['A100'],
    display: 'flex',
    gap: 6,
    '&::before': {
      content: '""',
      width: 2,
      background: theme.palette.customMain[800],
    },
  },

  calculaions: {
    '.calc-item': {
      padding: '18px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&:nth-of-type(n):not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.customMain[100]}`,
      },
      '.name': {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.grey[900],
      },
      '.value': {
        color: theme.palette.grey[900],
      },
      '.comment': {
        padding: 0,
        fontSize: 12,
        color: theme.palette.grey[200],

        [theme.breakpoints.down('md')]: {
          margin: 0,
        },
      },
    },
  },
}));
