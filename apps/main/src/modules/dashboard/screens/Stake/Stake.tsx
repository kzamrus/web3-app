import { Box, Typography } from '@mui/material';
import { TextGradient } from 'modules/common/components/TextGradient';
import { featureConfig } from 'modules/common/featureConfig';
import { useTranslation } from 'modules/i18n';
import { DepositsCap } from './components/DepositsCap';
import { LbtcAmount } from './components/LbtcAmount';
import { Points } from './components/Points';
import { StakeBtn } from './components/StakeBtn';
import { StakeFBTC } from './components/StakeFBTC';
import { translation } from './translation';

export function Stake(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  return (
    <>
      <Typography variant="h1" sx={{ mb: 3 }}>
        <span>{t(keys.title1)}</span>

        <br />

        <TextGradient component="span" color="text.secondary">
          {t(keys.title2)}
        </TextGradient>
      </Typography>

      <StakeFBTC />

      <Box
        sx={{
          mb: 2,
          display: 'grid',
          gridTemplateColumns: { lg: '1fr 1fr' },
          gap: 2,
        }}
      >
        <LbtcAmount />

        <Points />
      </Box>

      {featureConfig.earlyAccess ? (
        <DepositsCap />
      ) : (
        <StakeBtn sx={{ mt: 3.5 }} />
      )}
    </>
  );
}
