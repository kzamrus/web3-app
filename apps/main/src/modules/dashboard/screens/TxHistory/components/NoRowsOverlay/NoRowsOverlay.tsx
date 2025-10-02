import { Box, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';

export function NoRowsOverlay() {
  const { keys, t } = useTranslation(translation);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography
        sx={{
          color: theme => theme.palette.customMain[500],
          textAlign: 'center',
          fontSize: { md: 24 },
          fontWeight: 500,
        }}
      >
        {t(keys.noData)}
      </Typography>
    </Box>
  );
}
