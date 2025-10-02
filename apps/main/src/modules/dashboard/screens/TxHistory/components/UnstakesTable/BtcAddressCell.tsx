import { BITCOIN_NETWORK } from 'modules/api';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { makeStyles } from 'tss-react/mui';

interface IBtcAddressCellProps {
  address: string;
}

export function BtcAddressCell({ address }: IBtcAddressCellProps): JSX.Element {
  const { classes } = useStyles();
  return (
    <a
      className={classes.root}
      href={getExplorerLink(address, BITCOIN_NETWORK, 'address')}
      target="_blank"
      rel="norefferer"
    >
      {getShortAddr(address, 8)}
    </a>
  );
}

export const useStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
    }),

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
