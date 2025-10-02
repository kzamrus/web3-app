import { Box, Typography } from '@mui/material';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';
import { default as EarlyIcon } from './assets/iconEarly.svg?react';
import { usePointsStyles } from './usePointsStyle';

export function EarlyParticipant(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = usePointsStyles();

  return (
    <Box className={classes.earlyParticipant}>
      <Box
        component={EarlyIcon}
        sx={{
          flexShrink: 0,
          width: 27,
          height: 29,
          marginRight: 1,
        }}
      />
      <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}>
        {t(keys.earlyParticipant)}
      </Typography>
    </Box>
  );
}
