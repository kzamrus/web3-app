import { Box, BoxProps, MenuItem, Select } from '@mui/material';
import { useChainFromToStyles } from './useChainFromToStyles';
import { default as ArrowIcon } from '../../icons/arrow-icon.svg?react';
import { IuseSendTx } from '../BridgeForm/useSendTx';
import { Controller } from 'react-hook-form';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';
import { ChainSelectedValue } from './ChainSelectedValue';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useCallback } from 'react';
import { IS_PROD } from 'modules/common/const';
import { OChainId } from 'modules/api';

export function ChainFromTo({
  sx,
  sendTx,
}: Pick<BoxProps, 'sx'> & { sendTx: IuseSendTx }): JSX.Element {
  const { classes, cx } = useChainFromToStyles();
  const { watch, setValue } = sendTx;
  const fromValue = watch('from');
  const toValue = watch('to');
  const { keys, t } = useTranslation(translation);

  const shouldSwap = useCallback(
    (from: number, to: number) => {
      if (from == to) {
        setValue('from', toValue);
        setValue('to', fromValue);
      } else {
        setValue('from', from);
        setValue('to', to);
      }
    },
    [fromValue, toValue],
  );

  const handleSwap = useCallback(() => {
    setValue('from', toValue);
    setValue('to', fromValue);
  }, [toValue, fromValue]);

  const chains = SUPPORTED_CHAINS_WITH_ICONS.filter(el =>
    IS_PROD ? true : el.chainId !== OChainId.ethereum,
  );

  return (
    <Box className={cx(classes.root, 'chain-from-to')} sx={sx}>
      <Controller
        name="from"
        control={sendTx.control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              onChange={e => shouldSwap(Number(e.target.value), toValue)}
              className={classes.chainSelect}
              renderValue={value => (
                <ChainSelectedValue
                  chainId={Number(value)}
                  text={t(keys.from)}
                />
              )}
            >
              {chains.map(chain => (
                <MenuItem
                  key={chain.chainId}
                  className={classes.chainSelectOption}
                  value={chain.chainId}
                >
                  <chain.icon />
                  <span>{chain.name}</span>
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
      <Box
        className={cx(classes.indicator, 'mid', 'arrow')}
        onClick={handleSwap}
      >
        <ArrowIcon />
      </Box>
      <Controller
        name="to"
        control={sendTx.control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              onChange={e => shouldSwap(fromValue, Number(e.target.value))}
              className={classes.chainSelect}
              renderValue={value => (
                <ChainSelectedValue chainId={Number(value)} text={t(keys.to)} />
              )}
            >
              {chains.map(chain => (
                <MenuItem
                  key={chain.chainId}
                  className={classes.chainSelectOption}
                  value={chain.chainId}
                >
                  <chain.icon />
                  <span>{chain.name}</span>
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </Box>
  );
}
