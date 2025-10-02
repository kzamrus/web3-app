import { Box } from '@mui/material';
import { Milliseconds } from 'modules/common/types';
import { useGetCurrentBlockHeightQuery } from 'modules/dashboard/actions/getCurrentBlockHeight';
import { useActiveDeposits } from '../../hooks/useActiveDeposits';
import { Deposit } from '../Deposit/Deposit';

const BLOCK_HEIGHT_POLLING_INTERVAL: Milliseconds = 60_000;

export function DepositsList(): JSX.Element {
  const { activeDeposits } = useActiveDeposits();

  const { data: blockHeight } = useGetCurrentBlockHeightQuery(undefined, {
    pollingInterval: BLOCK_HEIGHT_POLLING_INTERVAL,
  });

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      {activeDeposits.map(({ txid, index = 0 }) => (
        <Deposit
          key={`${txid}-${index}`}
          txId={txid}
          txIndex={index}
          currentBlockHeight={blockHeight}
        />
      ))}
    </Box>
  );
}
