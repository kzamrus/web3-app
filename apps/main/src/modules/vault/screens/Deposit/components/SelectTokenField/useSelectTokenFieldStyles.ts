import { makeStyles } from 'tss-react/mui';

export const useSelectTokenFieldStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
  },
  labelBox: {
    marginBottom: '10px',
  },
  item: {
    fontSize: theme.typography.pxToRem(16),
  },
  label: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: '700',
  },
  select: {
    width: '100%',
  },
}));
