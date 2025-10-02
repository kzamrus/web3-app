import { Box, Typography } from '@mui/material';
import { useStrategyDescriptionWidgetStyles } from './useStrategyDescriptionWidgetStyles';
import { TFunction, useTranslation } from 'modules/i18n';
import { translation } from './translation';

const renderItems = (t: TFunction, keys: Record<string, string>) => [
  { name: t(keys.name1), value: t(keys.value1) },
  { name: t(keys.name2), value: t(keys.value2) },
  { name: t(keys.name3), value: t(keys.value3) },
];

export const StrategyDescriptionWidget = () => {
  const { classes } = useStrategyDescriptionWidgetStyles();
  const { t, keys } = useTranslation(translation);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.title} component="h3">
          {t(keys.title)}
        </Typography>
      </Box>
      <Box className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.list}>
            {renderItems(t, keys).map(({ name, value }, id) => (
              <Box key={`${name}-${id}`} className={classes.listItem}>
                <Box>
                  <Typography
                    className={classes.header}
                    variant="body1"
                    fontWeight="600"
                  >
                    {name}
                  </Typography>
                </Box>
                <Box>
                  <Typography className={classes.plot} variant="body1">
                    {value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
