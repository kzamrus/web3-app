import {
  Box,
  BoxProps,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';
import { HUNDRED_PERCENT, ONE, ZERO } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { OSlippageKey, slippageValuesMap } from 'modules/swap/const';
import { selectSlippageState } from 'modules/swap/store/slippageSlice';
import { selectSwapState } from 'modules/swap/store/swapSlice';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { default as ToggleIcon } from '../../icons/toggle-icon.svg?react';
import { SwapFormContext } from './SwapForm';
import { translation } from './translation';
import { useFeesStyles } from './useFeesStyles';

type FeesProps = Pick<BoxProps, 'sx'>;

export function Fees({ sx }: FeesProps) {
  const { classes, cx } = useFeesStyles();
  const { t, keys } = useTranslation(translation);
  const [open, setOpen] = useState(false);
  const { slippageKey } = useSelector(selectSlippageState);
  const { receiveAmount } = useSelector(selectSwapState);
  const {
    srcToken,
    dstToken,
    dstAmount,
    usdcAmount,
    ethToken,
    gasUSDCAmount,
    gas,
    gasPrice,
    dstUSDCAmount,
  } = useContext(SwapFormContext);

  const noReceive = receiveAmount.isEqualTo(ZERO);

  const slippage = slippageValuesMap[slippageKey];

  const gasValue = useMemo(() => {
    if (noReceive) return ZERO;

    if (!ethToken || !gas) return ZERO;

    const ethAmount = gas
      .multipliedBy(gasPrice)
      .dividedBy(10 ** ethToken.decimals);

    const toUSDC = ethAmount.multipliedBy(gasUSDCAmount);

    return toUSDC;
  }, [gasUSDCAmount, noReceive, gasPrice, receiveAmount]);

  const toUsdValue = useMemo(
    () =>
      new BigNumber(receiveAmount).dividedBy(ONE).multipliedBy(dstUSDCAmount),
    [dstUSDCAmount, receiveAmount],
  );

  const feeItems = [
    {
      name: t(keys.slippage),
      output:
        slippageKey === OSlippageKey.auto
          ? t(keys.auto, { percent: slippage })
          : t(keys.slippageOutput, { percent: slippage }),
    },
    {
      name: t(keys.miniReceive),
      output: t(keys.miniReceiveOutput, {
        amount: amountDisplay(calcReceiveAmount(receiveAmount, slippage)),
        usd: amountDisplay(calcReceiveAmount(toUsdValue, slippage), 2),
        token: dstToken?.symbol?.toUpperCase?.(),
      }),
    },
    {
      name: t(keys.netFee),
      output: t(keys.netFeeOutput, { usd: amountDisplay(gasValue, 2) }),
    },
  ];

  const onToggle = useCallback(() => {
    setOpen(state => !state);
  }, []);

  return (
    <Box className={classes.root} sx={sx}>
      <ListItemButton className={classes.toggleBtn} onClick={onToggle}>
        <ListItemText
          primary={
            <Box className={classes.calculation}>
              <Typography className="amount">
                {t(keys.unitPrice, {
                  fromToken: srcToken?.symbol?.toUpperCase?.(),
                  toAmount: amountDisplay(noReceive ? ZERO : dstAmount),
                  toToken: dstToken?.symbol?.toUpperCase?.(),
                })}
              </Typography>
              <Typography className="usd">
                (~${amountDisplay(noReceive ? ZERO : usdcAmount, 2)})
              </Typography>
              <Typography className="gas">
                {t(keys.gas, { usd: amountDisplay(gasValue, 2) })}
              </Typography>
            </Box>
          }
        />
        <ToggleIcon
          className={cx(classes.toggleIcon, { unfold: open, shrink: !open })}
        />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.feeList} component="div" disablePadding>
          {feeItems.map(item => (
            <ListItemText
              key={item.name}
              sx={{ margin: 0 }}
              primary={
                <Box className={classes.feeItem}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.output}</Typography>
                </Box>
              }
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
}

function calcReceiveAmount(srcAmount: BigNumber, slippagePct: number) {
  const rate = (HUNDRED_PERCENT - slippagePct) / HUNDRED_PERCENT;
  return srcAmount.multipliedBy(rate);
}
