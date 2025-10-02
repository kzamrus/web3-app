import {
  Box,
  BoxProps,
  Button,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useSwapFieldStyles } from './useSwapFieldStyles';
import { default as ExchangeIcon } from '../../icons/exchange-icon.svg?react';
import { InputNumber } from 'modules/common/components/InputNumber';
import { IUseSwap } from '../../hooks/useSwap';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
// import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { TokenSelectedValue } from './TokenSelectedValue';
import { SwapFormContext } from './SwapForm';
import { useDispatch } from 'react-redux';
import { setSwapData } from 'modules/swap/store/swapSlice';
import { default as DownIcon } from '../../icons/down-icon.svg?react';
import BigNumber from 'bignumber.js';
import { LBTC_ADDRESS } from 'modules/swap/const';
import { useLazyGetSwapQuoteQuery } from 'modules/swap/actions/getSwapQuote';
import { useConnection, useWalletConnectModal } from 'modules/auth';
import { TChainId } from 'modules/api';
import { ONE, ZERO } from 'modules/common/const';
import { debounce } from 'lodash-es';

interface ISwapFieldProps extends Pick<BoxProps, 'sx'> {
  useSwap: IUseSwap;
}

export function SwapField({ useSwap, sx }: ISwapFieldProps): JSX.Element {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { chainId, isConnected } = useConnection();
  const { onOpen } = useWalletConnectModal();

  const { classes } = useSwapFieldStyles();
  const { keys, t } = useTranslation(translation);
  const { watch, setValue, control } = useSwap;
  const {
    availableTokens,
    fromBalance,
    toBalance,
    setDstSelectOpen,
    setSrcSelectOpen,
    dstUSDCAmount,
    usdcAmount,
    srcToken,
    dstToken,
  } = useContext(SwapFormContext);
  const dispatch = useDispatch();

  const [quote] = useLazyGetSwapQuoteQuery();

  const fromTokenValue = watch('fromToken');
  const fromAmountValue = watch('fromAmount') || 0;
  const toTokenValue = watch('toToken');
  const toAmountValue = watch('toAmount') || 0;

  const selectedFromToken = availableTokens[fromTokenValue] ?? {};

  const selectedToToken = availableTokens[toTokenValue] ?? {};

  const onFromToggle = useCallback(
    () => (isConnected ? setSrcSelectOpen(true) : onOpen()),
    [isConnected],
  );

  const onToToggle = useCallback(
    () => (isConnected ? setDstSelectOpen(true) : onOpen()),
    [isConnected],
  );

  const fromUsdValue = useMemo(
    () =>
      new BigNumber(fromAmountValue).dividedBy(ONE).multipliedBy(usdcAmount),
    [fromAmountValue, usdcAmount],
  );

  const toUsdValue = useMemo(
    () =>
      new BigNumber(toAmountValue).dividedBy(ONE).multipliedBy(dstUSDCAmount),
    [dstUSDCAmount, toAmountValue],
  );

  const onExchange = useCallback(async () => {
    if (!srcToken || !dstToken) return;

    setValue('fromToken', toTokenValue);
    setValue('fromAmount', String(toAmountValue));
    setValue('toToken', fromTokenValue);

    const { data } = await quote({
      src: toTokenValue,
      dst: fromTokenValue,
      amount: new BigNumber(toAmountValue).multipliedBy(
        10 ** dstToken.decimals,
      ),
      chainId: chainId as TChainId,
    });

    const toAmount = (data?.dstAmount ?? ZERO).dividedBy(
      10 ** srcToken.decimals,
    );

    setValue('toAmount', amountDisplay(toAmount));
  }, [
    fromTokenValue,
    fromAmountValue,
    toTokenValue,
    toAmountValue,
    dstToken,
    srcToken,
  ]);

  const onFromAmountChange = useCallback(
    async (amount: number) => {
      if (!srcToken || !dstToken || !chainId) return;

      const { data } = await quote({
        src: srcToken.address,
        dst: dstToken.address,
        amount: new BigNumber(amount).multipliedBy(10 ** srcToken.decimals),
        chainId: chainId as TChainId,
      });

      const toAmount = (data?.dstAmount ?? ZERO).dividedBy(
        10 ** dstToken.decimals,
      );

      setValue('toAmount', amountDisplay(toAmount));
    },
    [fromTokenValue, srcToken, dstToken, chainId],
  );

  useEffect(() => {
    dispatch(
      setSwapData({
        sendAmount: new BigNumber(fromAmountValue),
        receiveAmount: new BigNumber(toAmountValue),
      }),
    );
  }, [dispatch, fromAmountValue, toAmountValue]);

  // At least one on both sides must be LBTC
  useEffect(() => {
    if (fromTokenValue !== LBTC_ADDRESS) {
      setValue('toToken', LBTC_ADDRESS);
    }
  }, [fromTokenValue]);

  useEffect(() => {
    if (toTokenValue !== LBTC_ADDRESS) {
      setValue('fromToken', LBTC_ADDRESS);
    }
  }, [toTokenValue]);

  const fromBalanceRender = useMemo(
    () => (
      <Box className={classes.balanceAndMax}>
        <Typography variant="caption">
          {t(keys.balance, { balance: amountDisplay(fromBalance) })}
        </Typography>
        <Button
          variant="text"
          className={classes.maxBtn}
          onClick={() => {
            const amount = amountDisplay(fromBalance.toString());
            setValue('fromAmount', amount);
            onFromAmountChange(Number(amount));
          }}
        >
          {t(keys.maxBtn)}
        </Button>
      </Box>
    ),
    [t, keys, fromBalance],
  );

  const toBalanceRender = useMemo(
    () => (
      <Box className={classes.balanceAndMax}>
        <Typography variant="caption">
          {t(keys.balance, { balance: amountDisplay(toBalance) })}
        </Typography>
      </Box>
    ),
    [t, keys, toBalance],
  );

  const onDebounceChange = useCallback(
    debounce((e: React.FormEvent<HTMLInputElement>) => {
      onFromAmountChange(Number((e.target as any).value));
    }, 500),
    [onFromAmountChange],
  );

  return (
    <Box sx={sx} className={classes.root}>
      <Box className={classes.fromToken}>
        <InputLabel className={classes.label} shrink htmlFor="from-token">
          {t(keys.sendLabel)}
        </InputLabel>

        <Box className={classes.tokenSelectWrapper}>
          <Controller
            name="fromToken"
            control={control}
            render={({ field }) => (
              <Box
                {...field}
                id="from-token"
                onClick={onFromToggle}
                className={classes.tokenSelect}
              >
                <TokenSelectedValue token={selectedFromToken} />
                <DownIcon />
              </Box>
            )}
          />
          {!onlyMediumScreen && fromBalanceRender}
        </Box>

        <Box className={classes.amount}>
          <Controller
            name="fromAmount"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                onInput={onDebounceChange}
                placeholder="0"
              />
            )}
          />
          <Typography variant="caption">
            {t(keys.usd, { usd: amountDisplay(fromUsdValue, 2) })}
          </Typography>
          {onlyMediumScreen && fromBalanceRender}
        </Box>
      </Box>
      <Box component="a" className={classes.exchangeBtn} onClick={onExchange}>
        <ExchangeIcon />
      </Box>
      <Box className={classes.toToken}>
        <InputLabel className={classes.label} shrink htmlFor="to-token">
          {t(keys.receiveLabel)}
        </InputLabel>

        <Box className={classes.tokenSelectWrapper}>
          <Controller
            name="toToken"
            control={control}
            render={({ field }) => (
              <Box
                {...field}
                id="to-token"
                onClick={onToToggle}
                className={classes.tokenSelect}
              >
                <TokenSelectedValue token={selectedToToken} />
                <DownIcon />
              </Box>
            )}
          />
          {!onlyMediumScreen && toBalanceRender}
        </Box>

        <Box className={classes.amount}>
          <Controller
            name="toAmount"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                className={classes.toAmount}
                disabled
                placeholder="0"
              />
            )}
          />
          <Typography variant="caption">
            {t(keys.usd, { usd: amountDisplay(toUsdValue, 2) })}
          </Typography>
          {onlyMediumScreen && toBalanceRender}
        </Box>
      </Box>
    </Box>
  );
}
