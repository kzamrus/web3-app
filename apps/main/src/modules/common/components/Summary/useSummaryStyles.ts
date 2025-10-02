import { makeStyles } from 'tss-react/mui';

export const useSummaryStyles = makeStyles()(theme => ({
  summary: {
    listStyle: 'none',
    padding: 0,
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2.5, 0),
    gap: theme.spacing(1),

    '&:first-of-type': {
      paddingTop: 0,
    },

    '&:last-of-type': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },

  itemLabel: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    flexShrink: 0,
  },

  itemContent: {
    flexShrink: 0,
    maxWidth: '50%',
    display: 'grid',
    textAlign: 'right',
  },

  itemValue: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  itemAdditional: {
    color: theme.palette.grey[200],
    fontSize: theme.typography.pxToRem(12),
  },

  itemSkeleton: {
    display: 'inline-flex',
  },
}));
