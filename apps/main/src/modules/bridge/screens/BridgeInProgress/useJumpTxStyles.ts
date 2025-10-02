import { makeStyles } from 'tss-react/mui';

export const useJumpTxStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    a: {
      padding: 0,
      gap: 4,
      background: 'transparent !important',
    },
  },

  spinner: {
    animation: `rotate 2s linear infinite`,
    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },
}));
