import { Box, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { default as LBTCLogo } from '../../assets/LBTCLogo.svg?react';
import { default as VedaLogo } from '../../assets/VedaLogo.svg?react';
import { default as LombardPointsLogo } from '../../assets/LombardPointsLogo.svg?react';
import { translation } from './translation';
import { useHowItWorksWidgetStyles } from './useHowItWorksWidgetStyles';

export const HowItWorksWidget = () => {
  const { classes } = useHowItWorksWidgetStyles();
  const { t, keys } = useTranslation(translation);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} component="h3">
        {t(keys.title)}
      </Typography>
      <Box className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.step}>
            <LombardPointsLogo className={classes.image} />
            <Typography className={classes.subtitle}>
              {t(keys.step1Title)}
            </Typography>
            <Typography className={classes.description}>
              {t(keys.step1Description)}
            </Typography>
          </Box>
          <Box className={classes.step}>
            <LBTCLogo className={classes.image} />
            <Typography className={classes.subtitle}>
              {t(keys.step2Title)}
            </Typography>
            <Typography className={classes.description}>
              {t(keys.step2Description)}
            </Typography>
          </Box>
          <Box className={classes.step}>
            <VedaLogo className={classes.image} />
            <Typography className={classes.subtitle}>
              {t(keys.step3Title)}
            </Typography>
            <Typography className={classes.description}>
              {t(keys.step3Description)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
