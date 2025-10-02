import { Paper, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { SUPPORT_EMAIL } from 'modules/common/const';
import { dashboardRouteConfig } from 'modules/dashboard';
import { useAccessInfo } from 'modules/early-access/hooks/useAccessInfo';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { translation } from './translation';
import { useWrongWalletStyles } from './useWrongWalletStyles';
import { Button } from 'modules/common/components/Button';
import { removeAccessCode } from 'modules/early-access/utils/storeAccessCode';

export function WrongWallet(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useWrongWalletStyles();
  const { address } = useConnection();
  const { data } = useAccessInfo();
  const accessAddress = data?.wallet ?? 'unknown';

  const handleCleanCode = () => {
    removeAccessCode();
    window.location.reload();
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        {t(keys.title)}
      </Typography>

      <div className={classes.content}>
        <Typography className={classes.text}>
          {t(keys.text, { address, accessAddress }, true)}
        </Typography>

        <Typography className={classes.text} sx={{ mt: 2 }}>
          {t(
            keys.contactUs,
            {
              emailLink: getEmailLink(SUPPORT_EMAIL, address, accessAddress),
              email: SUPPORT_EMAIL,
            },
            true,
          )}
        </Typography>
      </div>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleCleanCode}
      >
        {t(keys.clearCode)}
      </Button>

      <CloseBtn
        component={Link}
        to={dashboardRouteConfig.main.generatePath()}
      />
    </Paper>
  );
}

function getEmailLink(
  email: string,
  currentAddress = '',
  accessAddress = '',
): string {
  return `mailto:${email}?subject=Wrong%20wallet%20address&body=Hello%2C%0A%0AI%20have%20a%20problem%20with%20my%20wallet%20address.%0A%0AThe%20current%20wallet%20address%20is%3A%20${currentAddress}%0AThe%20wallet%20address%20used%20to%20access%20the%20early%20access%20program%20is%3A%20${accessAddress}%0A%0A%0ARegards%2C%0A`;
}
