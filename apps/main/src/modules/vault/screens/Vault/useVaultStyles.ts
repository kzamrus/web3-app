import { makeStyles } from 'tss-react/mui';

export const useVaultStyles = makeStyles()(theme => ({
  title: {
    fontWeight: 600,
  },

  subtitle: {
    fontSize: theme.typography.pxToRem(18),
  },
  widget: {
    minHeight: 340,
    background:
      'radial-gradient(circle at -3.18% 141.75%, #9DF6CB 0%, #339090 22%, #5DC5C2 38%, #33A29D 54.5%, #C8F8F3 64%, #82D8CF 71.17%, #4BC0B3 100%)',
  },
}));
