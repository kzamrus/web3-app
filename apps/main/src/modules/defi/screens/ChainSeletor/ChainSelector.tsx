import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { useMemo, useState } from 'react';
import EthereumIcon from './assets/ethereum.svg?react';
import { translation } from './translation';
import { usePointsStyles } from './useStyle';

export const ChainList = [
  {
    name: 'Ethereum',
    icon: <EthereumIcon />,
    key: 'ethereum',
  },
];

export const getChainByKey = (key: string) => {
  return ChainList.find(chain => chain.key === key);
};

export function ChainSelector(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes, cx } = usePointsStyles();

  const [activeIndex, setActiveIndex] = useState(0);

  const Chains = useMemo(() => {
    return [...ChainList];
  }, [keys, t]);

  return (
    <Box className={classes.container}>
      <Box className={classes.list}>
        {Chains.map((item, index) => (
          <Box
            className={cx(
              classes.item,
              activeIndex === index && classes['item-active'],
            )}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item.icon}
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className={classes.select}>
        <Select
          id="chain-id"
          displayEmpty
          className={classes.chainSelect}
          value={activeIndex}
          onChange={e => setActiveIndex(Number(e.target.value))}
        >
          {ChainList.map((chain, index) => (
            <MenuItem
              key={chain.key}
              value={index}
              className={classes.chainSelectOption}
            >
              {chain.icon}
              <Typography sx={{ ml: 1 }}>{chain.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
