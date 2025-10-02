import { makeStyles } from 'tss-react/mui';

export const useBridgeInProgressStyles = makeStyles<{ duration?: number }>()(
  (theme, { duration = 2 }) => ({
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

    spinner: {
      animation: `rotate ${duration}s linear infinite`,
      '@keyframes rotate': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    },

    progress: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0,
      li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 0',
        '> span': {
          fontWeight: 600,
          color: theme.palette.grey[800],
        },
      },
    },

    bridgeDetail: {
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      background: theme.palette.grey[50],
      borderRadius: 8,
      '.sendings': {
        display: 'flex',
        alignItems: 'center',
        '.icon': {
          width: 20,
          height: 20,
          objectFit: 'contain',
        },
        '.lbtc': {
          color: theme.palette.grey[900],
          marginLeft: 6,
        },
        '.usd': {
          color: theme.palette.grey[300],
          marginLeft: 6,
        },
      },
    },

    chainsPair: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      '.chain': {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      },
      '.indicator': {
        width: 24,
        height: 24,
        objectFit: 'contain',
      },
    },
  }),
);
