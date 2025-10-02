import { makeStyles } from 'tss-react/mui';

export const useNotificationStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(2, 2.25),
    background: theme.palette.background.paper,
    color: theme.palette.common.white,
    borderRadius: 16,
    wordBreak: 'break-word',
  },

  error: {
    background: theme.palette.error.main,
  },

  info: {
    background: theme.palette.info.main,
  },

  warning: {
    background: theme.palette.warning.main,
  },

  success: {
    background: theme.palette.success.main,
  },

  header: {
    margin: -1,
    fontWeight: 500,
  },

  text: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
  },

  icon: {
    display: 'block',
    width: '1em',
    height: '1em',
    fontSize: theme.typography.pxToRem(20),

    color: 'inherit',
  },
}));
