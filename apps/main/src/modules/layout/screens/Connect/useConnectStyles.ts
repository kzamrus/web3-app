import { SECOND_FONT_FAMILY } from 'modules/themes';
import { makeStyles } from 'tss-react/mui';

export const useConnectStyles = makeStyles()(theme => ({
  connectBtn: {
    height: 40,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: SECOND_FONT_FAMILY,
    fontWeight: 600,
  },
}));
