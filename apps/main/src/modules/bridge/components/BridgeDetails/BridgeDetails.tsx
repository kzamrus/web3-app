import { Box, BoxProps } from '@mui/material';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';
import { useBridgeDetailsStyles } from './useBridgeDetailsStyles';
import { default as ArrowIcon } from '../../icons/arrow-icon.svg?react';
import { default as LBTC } from '../../icons/lbtc.svg?react';
import { TChainId } from 'modules/api';
import BigNumber from 'bignumber.js';
import { ACTION_CACHE_LONG } from 'modules/common/const';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';

export function BridgeDetails({
  fromChain,
  toChain,
  amount,
  sx,
}: Pick<BoxProps, 'sx'> & {
  fromChain: TChainId;
  toChain: TChainId;
  amount: BigNumber;
}): JSX.Element | string {
  const { cx, classes } = useBridgeDetailsStyles();

  const { data: btcPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const chainFrom = SUPPORTED_CHAINS_WITH_ICONS.find(
    chain => chain.chainId === fromChain,
  );

  const chainTo = SUPPORTED_CHAINS_WITH_ICONS.find(
    chain => chain.chainId === toChain,
  );

  if (!chainFrom || !chainTo) return '';

  return (
    <Box className={classes.root} sx={sx}>
      <Box className={classes.amount}>
        <LBTC className="icon" />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            ml: 0.75,
            columnGap: 0.75,
          }}
        >
          <span className="lbtc">{amountDisplay(amount)} LBTC</span>
          <span className="usd">
            ${amountDisplay(amount.multipliedBy(btcPrice))}
          </span>
        </Box>
      </Box>
      <Box className={classes.chainsPair}>
        <Box className={cx('chain', chainFrom.abbr)}>
          <chainFrom.icon />
          <span>{chainFrom.name}</span>
        </Box>
        <ArrowIcon className="indicator arrow" />
        <Box className={cx('chain', chainTo.abbr)}>
          <chainTo.icon />
          <span>{chainTo.name}</span>
        </Box>
      </Box>
    </Box>
  );
}
