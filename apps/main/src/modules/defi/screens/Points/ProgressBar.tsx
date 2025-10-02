import { makeStyles } from 'tss-react/mui';
import { Box, Typography } from '@mui/material';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';

export const useStyles = makeStyles()(theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      marginTop: 60,
    },
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    color: theme.palette.background.paper,
    width: '100%',
    [theme.breakpoints.down('md')]: {},
  },
  text: {
    fontSize: 12,
    fontWeight: 500,
  },
  comingSoon: {
    borderRadius: 36,
    background:
      'linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.51) 100%)',
    padding: '0 8px',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.customMain[700],
    fontSize: 12,
    marginTop: 10,
  },
}));

const CircularProgressBar = ({
  progress,
  size = 146,
  strokeWidth = 10,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius * 0.66;
  const { classes } = useStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <div
      style={{
        width: size,
        height: size * 0.75,
        position: 'relative',
        overflow: 'hidden',
      }}
      className={classes.container}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(150deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 4}
          strokeWidth={`2px`}
          fill="transparent"
          stroke="#51A3A2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="transparent"
          stroke="url(#paint0_angular_5731_2404)"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * ((100 - progress) / 100)}
          style={{
            transition: 'stroke-dashoffset 0.35s ease-in-out',
          }}
        />
        <defs>
          <radialGradient
            id="paint0_angular_5731_2404"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(120 80) scale(100)"
          >
            <stop offset="0%" stop-color="#339090" />
            <stop offset="100%" stop-color="white" />
          </radialGradient>
        </defs>
      </svg>
      <div className={classes.content}>
        <Typography className={classes.text}>
          {t(keys.effectiveMultiplier)}
        </Typography>
        <Box className={classes.comingSoon}>{t(keys.comingSoon)}</Box>
      </div>
    </div>
  );
};

export default CircularProgressBar;
