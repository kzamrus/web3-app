import { Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { SUPPORT_EMAIL } from 'modules/common/const';
import { InfoIcon } from 'modules/common/icons';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useSanctionedAddressStyles } from './useSanctionedAddressStyles';

export function SanctionedAddress(): JSX.Element {
  const { classes } = useSanctionedAddressStyles();
  const { keys, t } = useTranslation(translation);
  const { address } = useConnection();

  return (
    <div className={classes.root}>
      <InfoIcon className={classes.icon} />

      <Typography className={classes.text}>
        {t(keys.text, { link: getEmailLink(SUPPORT_EMAIL, address) }, true)}
      </Typography>
    </div>
  );
}

function getEmailLink(email: string, address = ''): string {
  return `mailto:${email}?subject=Restricted%20address%20assistance&body=Hello%2C%0A%0AI%20would%20like%20to%20ask%20for%20assistance%20with%20the%20restrictions%20on%20my%20wallet%20address.%0A%0AMy%20wallet%20address%20is%3A%20${address}%20%0A%0A%0ARegards%2C%0A`;
}
