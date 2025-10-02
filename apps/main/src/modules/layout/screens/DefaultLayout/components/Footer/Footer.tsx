import { Box, ButtonBase, Container, Typography } from '@mui/material';
import { POLICY_LINK, TERMS_OF_SERVICE_LINK } from 'modules/common/const';
import { dashboardRouteConfig } from 'modules/dashboard';
import { useTranslation } from 'modules/i18n';
import { Logo } from 'modules/layout/components/Logo';
import { Link } from 'react-router-dom';
import { translation } from './translation';
import { useFooterStyles } from './useFooterStyles';

const homePath = dashboardRouteConfig.main.generatePath();

export function Footer(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useFooterStyles();

  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
        py: 3,
        color: 'text.secondary',
      }}
    >
      <ButtonBase
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        to={homePath}
        component={Link}
      >
        <Logo style={{ height: 22 }} />
      </ButtonBase>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2">
          {t(keys.copyright, { year: new Date().getFullYear() })}
        </Typography>

        {!!TERMS_OF_SERVICE_LINK && (
          <ButtonBase
            className={classes.link}
            href={TERMS_OF_SERVICE_LINK}
            target="_blank"
            rel="norefferer"
          >
            {t(keys.tos)}
          </ButtonBase>
        )}

        {!!POLICY_LINK && (
          <ButtonBase
            className={classes.link}
            href={POLICY_LINK}
            target="_blank"
            rel="norefferer"
          >
            {t(keys.policy)}
          </ButtonBase>
        )}
      </Box>
    </Container>
  );
}
