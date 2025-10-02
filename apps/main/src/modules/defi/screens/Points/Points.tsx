import { Box, Typography } from '@mui/material';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';
import { usePointsStyles } from './usePointsStyle';
import { LombardPoints } from './LombardPoints';
import { HODLTime } from './HODLTime';
import CircularProgressBar from './ProgressBar';
import { EarlyParticipant } from './EarlyParticipant';
import { ConnectBtn } from './ConnectBtn';
import { useConnection } from 'modules/auth';
import { useGetLombaPointsFromSentioQueryQuery } from '../actions/getLombaPointsFromSentio';

export function Points(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = usePointsStyles();
  const { isConnected, address } = useConnection();
  const { data } = useGetLombaPointsFromSentioQueryQuery({
    address,
  });

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        <span className={classes.title}>{t(keys.title1)}</span>
      </Typography>
      <Box className={classes.root}>
        <LombardPoints points={data?.points ?? 0} />
        <HODLTime />
        {isConnected && <CircularProgressBar progress={70} />}
        {isConnected && <EarlyParticipant />}
      </Box>
      <ConnectBtn />
    </Box>
  );
}
