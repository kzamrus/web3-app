import { makeStyles } from 'tss-react/mui';

export const useRippleStyles = makeStyles<{
  color: string;
  duration: number;
}>()((_theme, { color, duration }) => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderRadius: 'inherit',
    '& span': {
      willChange: 'transform, opacity',
      transform: 'scale(0)',
      borderRadius: '50%',
      position: 'absolute',
      opacity: 0.75,
      backgroundColor: color,
      animation: `ripple ${duration}ms ease-in-out`,
    },
    '@keyframes ripple': {
      '100%': {
        opacity: 0,
        transform: 'scale(3)',
      },
    },
  },
}));
