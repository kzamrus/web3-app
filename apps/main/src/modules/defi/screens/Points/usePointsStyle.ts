import { makeStyles } from 'tss-react/mui';
export const usePointsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(6, 2),
    background: getGradientColor('100%', '820%'),
    color: theme.palette.common.white,
    position: 'relative',
    borderRadius: 8,
    marginBottom: 20,
    gap: 66,
    [theme.breakpoints.down('md')]: {
      gap: '2rem',
      background:
        'radial-gradient(269.05% 269.05% at -28.35% 100%, #339090 32%, #5DC5C2 48%, #33A29D 74.5%, #C8F8F3 84%, #82D8CF 91.17%, #4BC0B3 100%), #FFF',
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5.6, 4),
      gap: 66,
    },
  },
  title: {
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
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
  earlyParticipant: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '36px',
    padding: '6px 12px',
    color: theme.palette.customMain[800],
    background:
      'linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.51) 100%)',
    position: 'absolute',
    top: 16,
    right: 16,
    [theme.breakpoints.down('md')]: {
      top: 20,
      left: '50%',
      width: '90%',
      transform: 'translateX(-50%)',
      justifyContent: 'center',
    },
  },
  emptyPoints: {
    borderRadius: '8px',
    opacity: 0.2,
    background: theme.palette.background.paper,
    width: '258px',
    height: '36px',
  },
  points: {
    [theme.breakpoints.down('md')]: {
      marginTop: 110,
      marginBottom: 60,
    },
  },
}));
function getGradientColor(circleWidth: string, circleHeight: string) {
  return `radial-gradient(${circleWidth} ${circleHeight} at 10% 109%, #339090 50%, #5CBBB6 63%, #C8F8F3 71.34%, #87D5CD 84.84%, #8CCDC5 100%), #AEDEDA`;
}
