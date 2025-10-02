import { makeStyles } from 'tss-react/mui';

export const useStakeInfoStyles = makeStyles()(theme => ({
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.75, 0),
    gap: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5, 0),
    },

    '&:first-of-type': {
      paddingTop: 0,
    },

    '&:last-of-type': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },

  summaryItemLabel: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    flexShrink: 0,
  },

  summaryItemContent: {
    display: 'grid',
    textAlign: 'right',
  },

  summaryItemValue: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.grey[400],
  },

  summaryItemAdditional: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
  },

  summaryItemSkeleton: {
    display: 'inline-flex',
  },
}));
