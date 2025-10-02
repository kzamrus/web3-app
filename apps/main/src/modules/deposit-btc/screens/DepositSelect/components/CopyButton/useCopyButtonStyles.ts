import { makeStyles } from 'tss-react/mui';

export const useCopyButtonStyles = makeStyles()(theme => ({
  copyButton: {
    display: 'flex',
    padding: theme.spacing(1),
    margin: theme.spacing(-1),
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  copyIcon: {
    width: '1em',
    height: '1em',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 1,
  },
}));
