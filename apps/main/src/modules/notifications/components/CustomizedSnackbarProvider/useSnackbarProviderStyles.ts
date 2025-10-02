import { makeStyles } from 'tss-react/mui';

export const useSnackbarProviderStyles = makeStyles()(theme => {
  return {
    containerAnchorOriginTopCenter: {
      width: '100%',
      maxWidth: `calc(100% - ${theme.spacing(2)})`,
      alignItems: 'stretch',

      [theme.breakpoints.up('md')]: {
        maxWidth: 700,
      },
    },

    containerAnchorOriginBottomLeft: {
      maxWidth: `calc(100% - 100px)`,

      [theme.breakpoints.up('md')]: {
        maxWidth: 500,
      },
    },
  };
});
