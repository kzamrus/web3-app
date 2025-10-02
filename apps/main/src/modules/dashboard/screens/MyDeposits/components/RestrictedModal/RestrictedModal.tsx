import { Box, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useRestrictedModalStyles } from './useRestrictedModalStyles';

import { SUPPORT_EMAIL } from 'modules/common/const';
import { default as Icon } from './assets/not-available.svg?react';

export function RestrictedModal(): JSX.Element {
  const { classes } = useRestrictedModalStyles();
  const { keys, t } = useTranslation(translation);
  const { address } = useConnection();

  return (
    <Box className={classes.root}>
      <Icon className={classes.icon} />

      <Typography className={classes.title} variant="h1" component="h2">
        {t(keys.title)}
      </Typography>

      <Typography className={classes.text}>
        {t(
          keys.description,
          { link: getEmailLink(SUPPORT_EMAIL, address) },
          true,
        )}
      </Typography>
    </Box>
  );
}

function getEmailLink(email: string, address = ''): string {
  return `mailto:${email}?subject=Restricted%20deposit%20assistance&body=Hello%2C%0A%0AI%20need%20assistance%20with%20my%20restricted%20deposit.%0A%0AMy%20wallet%20address%20is%3A%20${address}%20%0A%0A%0ARegards%2C%0A`;
}
