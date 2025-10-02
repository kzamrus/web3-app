import { Button } from '@mui/material';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { translation } from './translation';

const dashboardPath = dashboardRouteConfig.main.generatePath();

export function BackButton(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  return (
    <Button
      fullWidth
      component={Link}
      to={dashboardPath}
      variant="contained"
      size="large"
    >
      {t(keys.toDashboard)}
    </Button>
  );
}
