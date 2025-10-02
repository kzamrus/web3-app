import { makeStyles } from 'tss-react/mui';

export const usePeriodSelectStyles = makeStyles()(theme => ({
  custom: {
    display: 'flex',
    padding: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    minWidth: '158px',
    height: '36px',
    border: '1px solid transparent',
    backgroundColor: theme.palette.common.white,
  },
}));
