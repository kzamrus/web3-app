import {
  Box,
  BoxProps,
  MenuItem,
  Typography,
  InputBase,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useTokenSelectStyles } from './useTokenSelectStyles';
import { SwapFormContext } from './SwapForm';
import { IUseSwap } from '../../hooks/useSwap';
import { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { default as IconBack } from '../../icons/icon-back.svg?react';
import { default as IconSearch } from '../../icons/icon-search.svg?react';
import { debounce } from 'lodash-es';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { TToken } from 'modules/api/sdk/getSwapAvailableTokens';
import BigNumber from 'bignumber.js';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { ACTION_CACHE, ONE, ZERO } from 'modules/common/const';
import { useConnection } from 'modules/auth';
import { SUPPORTED_CHAIN, LBTC_ADDRESS } from 'modules/swap/const';
import { TChainId } from 'modules/api';
import { useLazyGetSwapQuoteQuery } from 'modules/swap/actions/getSwapQuote';
import { Address } from '@ankr.com/provider';

const TopTokenList = [
  'LBTC',
  'ETH',
  'WETH',
  'USDC',
  'DAI',
  'USDT',
  'WBTC',
  '1INCH',
  'BNB',
];

interface ISwapFieldProps extends Pick<BoxProps, 'sx'> {
  useSwap: IUseSwap;
}

type TokenDisplay = TToken & { balance: string; usd: string };

export function TokenSelect({ useSwap, sx }: ISwapFieldProps): JSX.Element {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { classes } = useTokenSelectStyles();
  const { keys, t } = useTranslation(translation);
  const { watch, setValue } = useSwap;
  const [searchText, setSearchText] = useState('');
  const [tokenFiltered, setTokenFiltered] = useState<TokenDisplay[]>([]);
  const { isConnected } = useConnection();
  const chainId = SUPPORTED_CHAIN;

  // LBTC
  const { data: lbtcBalanceData } = useGetLbtcBalanceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE,
    skip: !isConnected,
  });
  const lbtcBalance = lbtcBalanceData?.chains[chainId] ?? ZERO;

  const {
    availableTokens,
    tokenPricesData,
    srcSelectOpen,
    dstSelectOpen,
    setDstSelectOpen,
    setSrcSelectOpen,
  } = useContext(SwapFormContext);

  const [quote] = useLazyGetSwapQuoteQuery();

  const handleBack = () => {
    setDstSelectOpen(false);
    setSrcSelectOpen(false);
  };

  const fromTokenValue = watch('fromToken');
  const fromAmountValue = watch('fromAmount') || 0;
  const toTokenValue = watch('toToken');
  const toAmountValue = watch('toAmount') || 0;

  const tokenList = useMemo(() => {
    const res = [];
    for (const token in availableTokens) {
      let balanceInstance = tokenPricesData[token];
      const tokenInstance = availableTokens[token];
      if (!balanceInstance && availableTokens[token].address === LBTC_ADDRESS) {
        const wbtc = Object.values(availableTokens).find(
          item => item.symbol === 'WBTC',
        );
        if (wbtc) {
          balanceInstance = {
            balance: lbtcBalance.toString(),
            price: tokenPricesData[wbtc.address]?.price ?? 0,
            usd: amountDisplay(
              lbtcBalance.multipliedBy(
                tokenPricesData[wbtc.address]?.price ?? ONE,
              ),
            ),
          };
        }
      }
      if (!balanceInstance) continue;

      const balance =
        availableTokens[token].address === LBTC_ADDRESS
          ? lbtcBalance
          : new BigNumber(balanceInstance.balance).dividedBy(
              10 ** tokenInstance.decimals,
            );

      res.push({
        ...availableTokens[token],
        balance: amountDisplay(balance),
        usd: amountDisplay(balance.multipliedBy(balanceInstance?.price ?? ONE)),
      });
    }
    for (let i = 0; i < TopTokenList.length; i++) {
      const topToken = TopTokenList[i];
      const index = res.findIndex(item => item.symbol === topToken);
      if (index === i) continue;
      const temp: any = res[i];
      res[i] = res[index];
      res[index] = temp;
    }
    const sortedTopTokens = res
      .slice(1, 9)
      .sort((a, b) => Number(b.usd) - Number(a.usd));
    return [res[0], ...sortedTopTokens, ...res.slice(9)];
  }, [availableTokens, tokenPricesData]);

  const handleSearch = debounce(
    useCallback(
      v => {
        if (!v) {
          setTokenFiltered(tokenList);
        } else {
          const filtered = tokenList.filter(
            token =>
              token.symbol.toLowerCase().includes(v.toLowerCase()) ||
              token.address.toLowerCase().includes(v.toLowerCase()),
          );
          filtered.sort((a, b) => a.symbol.length - b.symbol.length);
          setTokenFiltered(filtered);
        }
      },
      [tokenList],
    ),
    300,
  );

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  const onExchange = useCallback(() => {
    setValue('fromToken', toTokenValue);
    setValue('fromAmount', String(toAmountValue));
    setValue('toToken', fromTokenValue);
    setValue('toAmount', String(fromAmountValue));
  }, [fromTokenValue, fromAmountValue, toTokenValue, toAmountValue]);

  const onFromTokenChange = useCallback(
    async (src: Address, dst: Address) => {
      if (!availableTokens || !chainId) return;

      const srcToken = availableTokens[src];
      const dstToken = availableTokens[dst];

      const { data } = await quote({
        src: srcToken.address,
        dst: dstToken.address,
        amount: new BigNumber(fromAmountValue).multipliedBy(
          10 ** srcToken.decimals,
        ),
        chainId: chainId as TChainId,
      });

      const toAmount = (data?.dstAmount ?? ZERO).dividedBy(
        10 ** dstToken.decimals,
      );

      setValue('toAmount', amountDisplay(toAmount));
    },
    [fromAmountValue, availableTokens, chainId],
  );

  const handleSelect = useCallback(
    (token: TokenDisplay) => {
      if (srcSelectOpen) {
        if (token.address === toTokenValue) {
          onExchange();
        } else {
          setValue('fromToken', token.address);
        }
        onFromTokenChange(token.address, toTokenValue);
      } else if (dstSelectOpen) {
        if (token.address === fromTokenValue) {
          onExchange();
        } else {
          setValue('toToken', token.address);
        }
        onFromTokenChange(fromTokenValue, token.address);
      }
      handleBack();
    },
    [
      srcSelectOpen,
      dstSelectOpen,
      onExchange,
      fromTokenValue,
      toTokenValue,
      setValue,
      handleBack,
      onFromTokenChange,
    ],
  );

  return (
    <Box sx={sx} className={classes.root}>
      <Box component="a" className={classes.backButton} onClick={handleBack}>
        <IconBack />
      </Box>
      <Typography variant="h1" className={classes.title}>
        {t(keys.selectToken)}
      </Typography>
      <Box className={classes.inputContainer}>
        <Box component="a" className={classes.iconSearch}>
          <IconSearch />
        </Box>
        <InputBase
          className={classes.input}
          id="tx-id"
          placeholder={t(keys.inputPlaceholder)}
          sx={{
            '::placeholder': {
              color: theme => theme.palette.grey[400],
            },
          }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Box>
      <FixedSizeList
        height={onlyMediumScreen ? 420 : 400}
        width="auto"
        itemSize={onlyMediumScreen ? 60 : 80}
        itemCount={tokenFiltered.length}
        overscanCount={5}
        itemData={tokenFiltered}
      >
        {(props: ListChildComponentProps) => {
          const { index, data, style } = props;
          const token = data[index];

          return (
            <MenuItem
              className={classes.tokenSelectItem}
              key={token.address}
              value={token.address}
              style={style}
              onClick={() => handleSelect(token)}
            >
              <Avatar
                src={token.logoURI}
                alt={token.symbol}
                className={classes.tokenAvatar}
              >
                <Typography>{token.symbol.slice(0, 1)}</Typography>
              </Avatar>
              <Box className={classes.tokenItemContent}>
                <Typography className={classes.tokenSymbol}>
                  {token.name}
                </Typography>
                <Typography className={classes.tokenBalance}>
                  {`${token.balance} ${token.symbol}`}
                </Typography>
              </Box>
              <Typography className={classes.tokenUsd}>
                ${amountDisplay(token.usd, 2)}
              </Typography>
            </MenuItem>
          );
        }}
      </FixedSizeList>
    </Box>
  );
}
