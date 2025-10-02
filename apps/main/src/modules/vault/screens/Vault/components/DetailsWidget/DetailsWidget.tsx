import { Box, Chip, IconButton, Typography } from '@mui/material';
import { TFunction, useTranslation } from 'modules/i18n';
import { useDetailsWidgetStyles } from './useDetailsWidgetStyles';
import { translation } from './translation';
import { default as Copy } from '../../assets/copy.svg?react';
import { Link } from 'react-router-dom';
import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';
import { VAULT_CONTRACT } from 'modules/vault/const';

const VAULT_LINK = `https://etherscan.io/address/${VAULT_CONTRACT}`;

const renderItems = (t: TFunction, keys: Record<string, string>) => [
  { name: t(keys.label1), value: <Box sx={{ display: 'flex', gap: '5px'}}>
    <Chip sx={{ backgroundColor: '#eee'}} label={t(keys.lombard)} />
    &
    <Chip sx={{ backgroundColor: '#eee'}} label={t(keys.sevenSeas)} />
  </Box>  },
  { name: t(keys.label2), value: '1.5%', tooltip: t(keys.tooltip) },
  { name: t(keys.label3), value: '0%' },
  { name: t(keys.label4), value: '0%' },
  {
    name: t(keys.label5),
    value: VAULT_CONTRACT,
    canCopy: true,
  },
];

export const DetailsWidget = () => {
  const { t, keys } = useTranslation(translation);
  const { classes } = useDetailsWidgetStyles();
  const isMobile = useDetectMobile();

  return (
    <Box>
      <Box>
        <Box>
          <Typography className={classes.title} component="h3">
            {t(keys.title)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.paper}>
        <Box className={classes.list}>
          {renderItems(t, keys).map(({ name, value, canCopy, tooltip }, id) => (
            <Box
              key={`${name}-${id}`}
              className={classes.listItem}
              sx={{
                alignItems: canCopy && isMobile ? 'flex-start' : 'center',
                flexDirection: canCopy && isMobile ? 'column' : 'row',
              }}
            >
              <Box className={classes.labelsWrapper}>
                <Typography className={classes.labels} variant="body2">
                  {name}
                </Typography>
              </Box>
              <Box
                className={classes.valuesWrapper}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {!canCopy && (
                  <Typography variant={isMobile ? 'body2' : 'body1'}>
                    {tooltip && (
                      <Box component="span" className={classes.tooltip}>
                        {tooltip}
                      </Box>
                    )}
                    {value}
                  </Typography>
                )}
                {canCopy && (
                  <>
                    <Typography
                      component={Link}
                      to={VAULT_LINK}
                      target="_blank"
                      variant="body1"
                      className={classes.link}
                    >
                      {VAULT_CONTRACT}
                    </Typography>

                    <IconButton target="_blank" href={VAULT_LINK}>
                      <Copy />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
