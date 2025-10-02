import { Box, BoxProps, IconButton } from '@mui/material';
import { useLazyGetSwapAggregationQuery } from 'modules/swap/actions/getSwapAggregation';
import { setRequote } from 'modules/swap/store/swapSlice';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSlippageVariantModal } from '../../hooks/useSlippageVariantModal';
import { default as RefreshIcon } from '../../icons/refresh-icon.svg?react';
import { default as SlippageSettingIcon } from '../../icons/slippage-setting-icon.svg?react';
import { SwapFormContext } from '../SwapForm';
import { SlippageSettingModal } from './SlippageSettingModal';
import { useMenusStyles } from './useMenusStyles';

export function Menus({ sx }: Pick<BoxProps, 'sx'>): JSX.Element {
  const { classes } = useMenusStyles();
  const { onOpen } = useSlippageVariantModal();
  const { srcToken, dstToken, ethToken, chainId } = useContext(SwapFormContext);
  const dispatch = useDispatch();

  const [requoteTrigger] = useLazyGetSwapAggregationQuery();

  const onRequote = useCallback(async () => {
    if (!srcToken || !dstToken || !ethToken || !chainId) return;

    const { data, isLoading } = await requoteTrigger({
      srcToken,
      dstToken,
      ethToken,
      chainId,
    });

    dispatch(setRequote({ requote: { data, isLoading } }));
  }, [requoteTrigger, srcToken, dstToken, ethToken, dispatch, chainId]);

  return (
    <Box className={classes.root} sx={sx}>
      <IconButton className={classes.button} onClick={onRequote}>
        <RefreshIcon />
      </IconButton>

      <IconButton className={classes.button} onClick={onOpen}>
        <SlippageSettingIcon />
      </IconButton>

      <SlippageSettingModal />
    </Box>
  );
}
