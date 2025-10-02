import { Box } from '@mui/material';
import { useConnection } from 'modules/auth';
import { ConnectBtn } from './components/ConnectBtn';
import { ConncectedWallet } from './components/ConnectedWallet';
import { NetworkBtn } from './components/NetworkBtn';

export function Connect(): JSX.Element {
  const { isConnected } = useConnection();

  return isConnected ? (
    <Box
      sx={{
        display: { xs: 'grid', md: 'flex' },
        gap: theme => theme.spacing(2),
      }}
    >
      <NetworkBtn />

      <ConncectedWallet />
    </Box>
  ) : (
    <ConnectBtn />
  );
}
