import { makeStyles } from 'tss-react/mui';

export const useQuoteStyles = makeStyles()(theme => ({
  root: {
    '--width': '3px',
    display: 'grid',
    gridTemplateColumns: 'var(--width) auto',
    gap: theme.spacing(0, 1.5),
    fontSize: theme.typography.pxToRem(14),

    '&:before': {
      content: `''`,
      width: 'var(--width)',

      borderRadius: 'var(--width)',
      background: theme.palette.primary.main,
    },
  },
}));
