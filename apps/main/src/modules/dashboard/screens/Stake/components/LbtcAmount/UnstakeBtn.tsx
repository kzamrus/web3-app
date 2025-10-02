import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { ACTION_CACHE, UNSTAKE_INFO_LINK, ZERO } from 'modules/common/const';
import { featureConfig } from 'modules/common/featureConfig';
import { useTranslation } from 'modules/i18n';
import { unstakeRoutesConfig } from 'modules/unstake';
import { Link } from 'react-router-dom';
import { translation } from './translation';

export function UnstakeBtn(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();

  const { data: lbtcBalanceData, isLoading: isLbtcBalanceLoading } =
    useGetLbtcBalanceQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected,
    });

  const balance = isConnected && lbtcBalanceData ? lbtcBalanceData.total : ZERO;

  const isUnstakeDisabled =
    !featureConfig.isUnstakeAvailable ||
    balance.isZero() ||
    isLbtcBalanceLoading;

  return (
    <Tooltip
      title={
        featureConfig.isUnstakeAvailable ? undefined : (
          <Box sx={{ maxWidth: 200 }}>
            {t(keys.buttonTooltip)}{' '}
            <Box
              component="a"
              href={UNSTAKE_INFO_LINK}
              target="_blank"
              rel="noreferrer"
              sx={{
                color: 'inherit',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'primary.main',
                },
              }}
            >
              {t(keys.buttonTooltipLink)}
            </Box>
          </Box>
        )
      }
    >
      <Box
        sx={{
          alignSelf: { md: 'flex-end' },
        }}
      >
        <Button
          component={featureConfig.isUnstakeAvailable ? Link : 'button'}
          to={
            featureConfig.isUnstakeAvailable
              ? unstakeRoutesConfig.main.generatePath()
              : undefined
          }
          disabled={isUnstakeDisabled}
          fullWidth
          size="large"
          variant="contained"
          color="secondary"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: theme => ({ md: theme.spacing(1.5, 4.5) }),
          }}
        >
          {featureConfig.isUnstakeAvailable ? (
            t(keys.button)
          ) : (
            <>
              <Typography
                component="span"
                sx={{ lineHeight: 1, fontSize: { md: 18 }, fontWeight: 500 }}
              >
                {t(keys.button)}
              </Typography>

              <Typography component="span" sx={{ fontSize: 13, lineHeight: 1 }}>
                {t(keys.comingSoon)}
              </Typography>
            </>
          )}
        </Button>
      </Box>
    </Tooltip>
  );
}
