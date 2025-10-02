import { makeStyles } from 'tss-react/mui';

export const usePointsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6, 2),
    background: getGradientColor('180%', '180%'),
    color: theme.palette.common.white,

    [theme.breakpoints.up('sm')]: {
      background: getGradientColor('140%', '220%'),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5, 2),
    },
  },

  content: {
    textAlign: 'center',
    width: '100%',

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',

      '&:hover': {
        textDecoration: 'underline dotted',
      },
    },
  },
}));

const dimmerColor = 'rgba(51, 110, 110, 0.42)';

function getGradientColor(circleWidth: string, circleHeight: string) {
  return `
  linear-gradient(
    ${dimmerColor},
    ${dimmerColor}
  ),
  radial-gradient(
    ${circleWidth} ${circleHeight} at 4% 109%,
    #9DF6CB 0%,
    #339090 50%,
    #5CBBB6 63%,
    #C8F8F3 71.34%,
    #87D5CD 84.84%,
    #8CCDC5 100%
  ), #AEDEDA`;
}
