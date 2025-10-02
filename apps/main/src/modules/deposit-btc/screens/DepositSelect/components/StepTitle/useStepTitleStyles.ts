import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStepTitleStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  number: {
    borderRadius: 40,
    border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    minWidth: 24,
    height: 24,
    padding: theme.spacing(0, 0.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: 1,
  },

  checkedIcon: {
    width: 12,
    height: 6,
    border: `solid ${theme.palette.text.secondary}`,
    borderWidth: '0 0 2px 2px',
    transform: 'rotate(-45deg) translate(1px, -1px)',
  },
}));
