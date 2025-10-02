import { makeStyles } from 'tss-react/mui';
import { buttonBaseClasses } from '@mui/material';

export const useConnectBtnStyles = makeStyles<void, 'root'>()(
  (theme, _, classes) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: theme.spacing(2),

      width: '100%',
      height: 60,
      padding: theme.spacing(0, 1.5),

      fontSize: theme.typography.pxToRem(16),
      textAlign: 'left',
      transition: theme.transitions.create(['background', 'borderColor']),
      background: theme.palette.background.default,

      [theme.breakpoints.up('md')]: {
        height: 72,
        fontSize: theme.typography.pxToRem(20),
        padding: theme.spacing(0, 3.5),
      },

      '&:hover': {
        background: theme.palette.customMain[200],
      },

      [`&.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.grey[100],
        background: theme.palette.grey[50],
      },
    },

    label: {
      fontSize: theme.typography.pxToRem(14),
      transition: theme.transitions.create('color'),

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(18),
      },

      [`.${classes.root}:hover &`]: {
        color: theme.palette.primary.main,
      },
    },

    icon: {
      display: 'flex',
      fontSize: theme.typography.pxToRem(36),
    },

    iconDisabled: {
      opacity: 0.7,
    },

    subtitle: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.grey['600'],

      [`.${buttonBaseClasses.disabled} &`]: {
        color: theme.palette.grey[100],
      },
    },
  }),
);
