import { selectClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useChainFromToStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
  },

  indicator: {
    padding: 8,
    borderRadius: 4,
    background: theme.palette.grey[50],
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 40,
    cursor: 'pointer',
    '& svg': {
      width: 24,
      height: 24,
      objectFit: 'contain',
    },

    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg)',
    },
  },

  chainSelect: {
    border: 'none',
    padding: '14px 28px 24px 28px',
    borderRadius: 8,
    background: theme.palette.grey[50],
    [`.${selectClasses.filled}`]: {
      height: 'unset !important',
      padding: 'unset !important',
    },
    [`.${selectClasses.icon}`]: {
      right: '24px !important',
    },
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '10px 16px 14px 16px',

      [`.${selectClasses.icon}`]: {
        right: '14px !important',
      },
    },
  },

  chainSelectedValue: {
    '& span': {
      fontSize: 16,
      color: theme.palette.grey[400],
      fontWeight: 700,
    },
    '& div': {
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
  },

  chainSelectOption: {
    display: 'flex',
    gap: 8,
    '& svg': {
      width: 24,
      height: 24,
      objectFit: 'contain',
    },
    '& span': {
      color: theme.palette.grey[900],
    },
  },
}));
