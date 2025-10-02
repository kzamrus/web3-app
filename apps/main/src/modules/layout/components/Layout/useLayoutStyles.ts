import { makeStyles } from 'tss-react/mui';

export const useLayoutStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: 360,
  },

  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));
