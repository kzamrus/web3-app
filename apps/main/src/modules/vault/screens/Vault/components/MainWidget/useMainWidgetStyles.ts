import { makeStyles } from 'tss-react/mui';

export const useMainWidgetStyles = makeStyles()(theme => ({
  root: {
    minHeight: 340,
    padding: theme.spacing(3, 4, 5),
    background:
      'radial-gradient(circle at -3.18% 141.75%, #9DF6CB 0%, #339090 22%, #5DC5C2 38%, #33A29D 54.5%, #C8F8F3 64%, #82D8CF 71.17%, #4BC0B3 100%)',
    color: theme.palette.common.white,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      background: `radial-gradient(268.97% 231.87% at -33.69% 106.66%, #9DF6CB 0%, #339090 32%, #5DC5C2 48%, #33A29D 74.5%, #C8F8F3 84%, #82D8CF 91.17%, #4BC0B3 100%), #FFF;`,
    },
  },

  titleWraper: {
    marginBottom: theme.spacing(4),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginBottom: '100px',

      flexDirection: 'row',
      alignItems: 'center',
      gap: 0,
    },
  },

  title: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(22),
    fontFamily: theme.typography.h2.fontFamily,
  },

  badgesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(),
    flexWrap: 'wrap',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
  },

  badge: {
    minHeight: 36,
    padding: theme.spacing(1, '10px'),
    borderRadius: 6,
    backgroundColor: theme.palette.customMain[100],

    fontWeight: 500,
    color: theme.palette.customMain[800],

    [theme.breakpoints.down('sm')]: {
      minHeight: 30,
      fontSize: theme.typography.pxToRem(14),
      whiteSpace: 'nowrap',
    },
  },

  badgeValue: {
    fontWeight: 600,
  },

  mainInfoWrapper: {
    marginBottom: '40px',

    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginBottom: '40px',
      flexDirection: 'row',
      gap: 0,
    },
  },

  btcInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    [theme.breakpoints.up('md')]: {
      marginRight: '53px',
    },

    [theme.breakpoints.down('sm')]: {
      marginBottom: 36,
    },
  },

  btcValueWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: theme.spacing(1),
    minWidth: 235,
  },

  btcValue: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 500,
    lineHeight: 1,
  },

  btcValueCurrency: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 600,
  },

  btcInfoUsdAmount: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
    color: theme.palette.customMain[200],
  },

  vaultTokenBalanceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',

    [theme.breakpoints.up('md')]: {
      marginTop: '-20px',
      marginRight: '74px',
    },
  },

  vaultTokenBalanceTitle: {
    fontWeight: 600,
  },

  lbtcvValueWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '6px',

    [theme.breakpoints.down('sm')]: {
      marginBottom: 36,
    },
  },

  lbtcvValue: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 500,
    lineHeight: 1,
  },

  lbtcvValueCurrency: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 600,
    lineHeight: 1.1,
  },

  lombardPointsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  lombardPointsTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',

    [theme.breakpoints.up('md')]: {
      marginTop: '-20px',
    },
  },

  lombardPointsTitle: {
    fontWeight: 600,
  },

  lombardPointsLogo: {
    width: 20,
    height: 20,
    fontSize: theme.typography.pxToRem(20),
  },

  lombardPointsValue: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 500,
    lineHeight: 1,
  },

  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      gap: theme.spacing(3),
    },
  },

  depositBtn: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },

  withdrawBtn: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.customMain[800],

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },

    '&:hover, &:active': {
      color: theme.palette.common.white,
    },
  },
}));
