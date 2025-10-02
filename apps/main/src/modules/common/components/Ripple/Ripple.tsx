import { Box } from '@mui/material';
import { MouseEvent, useLayoutEffect, useState } from 'react';
import { useRippleStyles } from './useRippleStyles';

export function Ripple({
  duration = 850,
  color = 'rgba(255, 255, 255, 0.5)',
}: {
  duration?: number;
  color?: string;
} = {}): JSX.Element {
  const { classes } = useRippleStyles({ color, duration });

  const [rippleArray, setRippleArray] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useLayoutEffect(() => {
    let bounceTimeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
    if (rippleArray.length > 0) {
      clearTimeout(bounceTimeoutId);
      bounceTimeoutId = setTimeout(() => {
        setRippleArray([]);
        clearTimeout(bounceTimeoutId);
      }, duration * 4);
    }
    return () => clearTimeout(bounceTimeoutId);
  }, [rippleArray.length, duration]);

  const addRipple = (event: MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = { x, y, size };

    setRippleArray(ripples => [...ripples, newRipple]);
  };

  return (
    <Box className={classes.root} onMouseEnter={addRipple}>
      {rippleArray.map((ripple, index) => (
        <span
          key={index}
          style={{
            top: `${ripple.y}px`,
            left: `${ripple.x}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
          }}
        />
      ))}
    </Box>
  );
}
