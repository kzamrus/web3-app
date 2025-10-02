import {
  Box,
  Button,
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useBridgeFormStyles } from './useBridgeFormStyles';
import { AmountField } from '../AmountField';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { ChainFromTo } from '../ChainFromTo';
import { useCallback, useMemo } from 'react';
import { SendAction } from '../SendAction/SendAction';
import { ConnectionChecker } from '../ConnectionChecker';
import { useSendTx } from './useSendTx';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { ACTION_CACHE, ETH_DECIMALS, ZERO } from 'modules/common/const';
import { useConnection } from 'modules/auth';
import { useGetLbtcDepositFeeRateQuery } from 'modules/bridge/actions/getLbtcDepositFee';
import { TChainId } from 'modules/api';
import BigNumber from 'bignumber.js';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';
import { capitalizeFirstLetter } from 'modules/bridge/utils/capitalizeFirstLetter';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';
import { useGetEstimateFeeQuery } from 'modules/bridge/actions/getEstimateFee';

export function BridgeForm({}: {}): JSX.Element {
  const { classes } = useBridgeFormStyles({});
  const { keys, t } = useTranslation(translation);
  const sendTx = useSendTx();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    errors,
    isSending,
    onSend,
    onInvalid,
    invalidChain,
    isSwitching,
  } = sendTx;
  const amountValue = new BigNumber(watch('amount'));
  const { isConnected, address = '' } = useConnection();
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { data: balancesData } = useGetLbtcBalanceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE,
    skip: !isConnected,
  });

  const fromChainId = watch('from') as TChainId;
  const toChainId = watch('to') as TChainId;

  const balance = balancesData?.chains[fromChainId] ?? ZERO;

  const { data: depositFeeRate } = useGetLbtcDepositFeeRateQuery({
    fromChainId,
    toChainId,
  });
  const feeRate = depositFeeRate ?? 0;

  const { data: estiamteFee = ZERO } = useGetEstimateFeeQuery({
    address,
    fromChain: fromChainId,
    toChain: toChainId,
  });

  const toChain = SUPPORTED_CHAINS_WITH_ICONS.find(
    chain => chain.chainId === toChainId,
  );

  const calculationDetails = useMemo(
    () => [
      {
        name: t(keys.fee),
        value: `${feeRate * 100}%`,
        comment: `${amountValue.gt(0) ? amountDisplay(amountValue.multipliedBy(feeRate)) : 0} LBTC`,
      },
      {
        name: t(keys.receive),
        value: `${amountValue.gt(0) ? amountDisplay(amountValue.multipliedBy(1 - feeRate)) : 0} LBTC`,
        comment: `${toChain?.name} network`,
      },
    ],
    [t, amountValue, feeRate, toChain],
  );

  const onCheckFinishBridge = useCallback(() => {
    navigate(bridgeRoutesConfig.bridgeFinish.path);
  }, [navigate]);

  return (
    <Box className={classes.root}>
      <h1 className={classes.title}>{t(keys.title)}</h1>

      <Typography className={classes.moveLbtcPrompt}>
        {t(keys.moveLBTC)}
      </Typography>

      <Button className={classes.finishBridgeBtn} onClick={onCheckFinishBridge}>
        {t(keys.finish)}
      </Button>

      <Box component="form" onSubmit={handleSubmit(onSend, onInvalid)}>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: t(keys.amountRequired),
            validate: value => {
              if (+value === 0) return t(keys.amountRequired);
              if (+value < 1e-8)
                return t(keys.amountTooSmall, {
                  min: amountDisplay(new BigNumber(1e-8)),
                });
              if (+value > balance.toNumber())
                return t(keys.amountInsufficient);
              return true;
            },
          }}
          render={({ field }) => (
            <>
              <AmountField field={field} max={balance} setValue={setValue} />
              {errors.amount && (
                <FormHelperText sx={{ mt: 1 }} error>
                  {errors.amount.message}
                </FormHelperText>
              )}
            </>
          )}
        />

        <ChainFromTo sx={{ mt: onlyMediumScreen ? 4 : 2 }} sendTx={sendTx} />

        <Box className={classes.calculaions} sx={{ mt: 1.25 }}>
          {calculationDetails.map(detail => (
            <Box className="calc-item" key={detail.name}>
              <span className="name">{detail.name}</span>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span className="value">{detail.value}</span>
                <p className="comment">{detail.comment}</p>
              </Box>
            </Box>
          ))}
        </Box>

        <Typography className={classes.gasPrompt} sx={{ mt: 1.75 }}>
          {t(keys.gasPrompt, {
            gas: amountDisplay(estiamteFee, ETH_DECIMALS),
            net: capitalizeFirstLetter(
              toChain?.abbr === 'mantle' ? 'mnt' : 'eth',
            ),
            symbol: (toChain?.abbr === 'mantle' ? 'mnt' : 'eth').toUpperCase(),
          })}
        </Typography>

        <ConnectionChecker sx={{ mt: 5 }}>
          <SendAction
            sx={{ mt: 5 }}
            type="submit"
            isSending={isSending}
            invalidChain={invalidChain}
            isSwitching={isSwitching}
          />
        </ConnectionChecker>
      </Box>
    </Box>
  );
}
