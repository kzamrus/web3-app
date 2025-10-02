import { Box, BoxProps, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { DepositsList } from './components/DepositsList';
import { useActiveDeposits } from './hooks/useActiveDeposits';
import { translation } from './translation';

export function MyDeposits({ sx }: Pick<BoxProps, 'sx'>): JSX.Element | null {
  const { keys, t } = useTranslation(translation);
  const { activeDeposits } = useActiveDeposits();

  const hasDeposits = !!activeDeposits.length;

  if (!hasDeposits) {
    return null;
  }

  return (
    <Box sx={sx}>
      <Typography
        variant="h2"
        sx={{ mb: 2, fontSize: { md: 38 }, fontWeight: 500 }}
      >
        {t(keys.title)}
      </Typography>

      <DepositsList />
    </Box>
  );
}
