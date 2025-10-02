import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useBridgeFinishStyles } from './useBridgeFinishStyles';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useState } from 'react';
import { Button } from 'modules/common/components/Button';
import { Ripple } from 'modules/common/components/Ripple';
import { useSendTxId } from './useSendTxId';
import { Controller } from 'react-hook-form';
import { ConnectionChecker } from 'modules/bridge/components/ConnectionChecker';
import { Section } from 'modules/common/components/Section';
import { BridgeDetails } from 'modules/bridge/components/BridgeDetails/BridgeDetails';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';
import { TChainId } from 'modules/api';
import { ZERO } from 'modules/common/const';
import { useBridgeFinish } from './useBridgeFinish';
import { default as CloseIcon } from '../../icons/icon-close.svg?react';
import { useNavigate } from 'react-router-dom';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';

export function BridgeFinish({}: {}): JSX.Element {
  const { classes } = useBridgeFinishStyles();
  const { keys, t } = useTranslation(translation);
  const [loading] = useState(false);
  const { control, errors, onSendTxId, handleSubmit, isSending, watch } =
    useSendTxId();
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const chanId = watch('chainId');
  const txHash = watch('txHash');
  const navigate = useNavigate();

  const { bridgeData, txhashNotExists } = useBridgeFinish({
    chainIdParam: chanId,
    txHashParam: txHash,
  });

  const amount = bridgeData?.totalAmount ?? ZERO;

  return (
    <Section centered>
      <Container className={classes.container}>
        <Box className={classes.root}>
          <Box
            component={CloseIcon}
            className={classes.closeIcon}
            onClick={() => {
              navigate(bridgeRoutesConfig.main.path);
            }}
          />
          <h1 className={classes.title}>{t(keys.title)}</h1>

          <Typography className={classes.prompt} sx={{ mt: 3.5 }}>
            {t(keys.intention)}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSendTxId)}>
            <Controller
              name="chainId"
              control={control}
              render={({ field }) => (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { sm: '1fr' },
                      gap: 2,
                      mt: onlyMediumScreen ? 0 : 5.5,
                    }}
                  >
                    <FormControl variant="standard">
                      <InputLabel shrink htmlFor="chain-id">
                        {t(keys.net)}
                      </InputLabel>
                      <Select
                        {...field}
                        sx={{ mt: theme => theme.spacing(3) }}
                        id="chain-id"
                        displayEmpty
                        className={classes.chainSelect}
                        input={<InputBase />}
                      >
                        {SUPPORTED_CHAINS_WITH_ICONS.map(chain => (
                          <MenuItem
                            key={chain.chainId}
                            value={chain.chainId}
                            className={classes.chainSelectOption}
                          >
                            <chain.icon />
                            <Typography sx={{ ml: 1 }}>{chain.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  {errors.chainId && (
                    <FormHelperText sx={{ mt: 1 }} error>
                      {errors.chainId.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />

            <Controller
              name="txHash"
              control={control}
              rules={{
                required: t(keys.txidRequired),
                validate: value =>
                  value.startsWith('0x') || t(keys.txidInvalid),
              }}
              render={({ field }) => (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { sm: '1fr' },
                      gap: 2,
                      mt: onlyMediumScreen ? '30px' : 5.5,
                    }}
                  >
                    <FormControl variant="standard">
                      <InputLabel shrink htmlFor="tx-id">
                        {t(keys.txId)}
                      </InputLabel>
                      <InputBase
                        {...field}
                        className={classes.input}
                        id="tx-id"
                        placeholder={t(keys.paste)}
                        sx={{
                          '::placeholder': {
                            color: theme => theme.palette.grey[400],
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  {errors.txHash && (
                    <FormHelperText sx={{ mt: 1 }} error>
                      {errors.txHash.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
            {!txhashNotExists && bridgeData && (
              <BridgeDetails
                sx={{ mt: 4 }}
                toChain={bridgeData?.chainId as TChainId}
                fromChain={chanId as TChainId}
                amount={amount}
              />
            )}
            <ConnectionChecker sx={{ mt: 5 }}>
              <Button
                sx={{ mt: 5 }}
                fullWidth
                variant="contained"
                className={classes.blackbtn}
                type="submit"
                isLoading={isSending}
              >
                {t(keys.finish)}

                <Ripple />
              </Button>
            </ConnectionChecker>
          </Box>

          <Backdrop
            sx={{ color: theme => theme.palette.common.white }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Container>
    </Section>
  );
}
