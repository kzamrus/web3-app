import { Address } from '@ankr.com/provider';
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { TChainId } from 'modules/api';
import { TokenUsdBalances } from 'modules/api/sdk/get1inchTokenPrices';
import { TToken, TTokens } from 'modules/api/sdk/getSwapAvailableTokens';
import { useConnection, useWalletConnectModal } from 'modules/auth';
import { useGetLbtcAllowanceQuery } from 'modules/common/actions/getLbtcAllowance';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { Button } from 'modules/common/components/Button';
import { ACTION_CACHE, ZERO } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { useGet1inchTokenPricesQuery } from 'modules/swap/actions/get1inchTokenPrices';
import { useGetGasPricePositionsQuery } from 'modules/swap/actions/getGasPricePositions';
import { useGetMyAssetsQuery } from 'modules/swap/actions/getMyAssets';
import { useGetSwapAggregationQuery } from 'modules/swap/actions/getSwapAggregation';
import { useGetSwapAvailableTokensQuery } from 'modules/swap/actions/getSwapAvailableTokens';
import { useGetSwapTrustedRouterQuery } from 'modules/swap/actions/getSwapTrustedRouter';
import {
  ACTION_CACHE_GAS_PRICE,
  ETH_STANDARD,
  ETH_USDC,
  LBTC_ADDRESS,
  slippageValuesMap,
  SUPPORTED_CHAIN,
} from 'modules/swap/const';
import { selectSlippageState } from 'modules/swap/store/slippageSlice';
import { selectSwapState } from 'modules/swap/store/swapSlice';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSwitchNetworkMutation } from '../../../auth/actions/switchNetwork.ts';
import { useSwap } from '../../hooks/useSwap';
import { Menus } from '../Menus';
import { Fees } from './Fees';
import { MobileTokenSelect } from './MobileTokenSelect';
import { SwapField } from './SwapField';
import { TokenSelect } from './TokenSelect';
import { translation } from './translation';
import { useSwapFormStyles } from './useSwapFormStyles';

interface ISwapFormContext {
  availableTokens: TTokens;
  tokenPricesData: TokenUsdBalances;
  isAvailableTokensDataLoading: boolean;
  srcToken?: TToken;
  dstToken?: TToken;
  ethToken?: TToken;
  dstAmount: BigNumber;
  usdcAmount: BigNumber;
  fromBalance: BigNumber;
  toBalance: BigNumber;
  gasUSDCAmount: BigNumber;
  gas: BigNumber;
  dstUSDCAmount: BigNumber;
  gasPrice: BigNumber;
  fromApproved: boolean;
  toApproved: boolean;
  fromSufficient: boolean;
  toSufficient: boolean;
  srcSelectOpen: boolean;
  dstSelectOpen: boolean;
  setSrcSelectOpen: (open: boolean) => void;
  setDstSelectOpen: (open: boolean) => void;
  lbtcAllowance: BigNumber;
  lbtcBalance: BigNumber;
  chainId?: TChainId;
}

export const SwapFormContext = createContext<ISwapFormContext>({
  availableTokens: {},
  tokenPricesData: {},
  isAvailableTokensDataLoading: false,
  dstAmount: ZERO,
  usdcAmount: ZERO,
  gasUSDCAmount: ZERO,
  fromBalance: ZERO,
  toBalance: ZERO,
  dstUSDCAmount: ZERO,
  gas: ZERO,
  gasPrice: ZERO,
  fromApproved: false,
  toApproved: false,
  fromSufficient: false,
  toSufficient: false,
  srcSelectOpen: false,
  dstSelectOpen: false,
  setSrcSelectOpen: function (): void {},
  setDstSelectOpen: function (): void {},
  lbtcAllowance: ZERO,
  lbtcBalance: ZERO,
});

export function SwapForm(): JSX.Element {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { classes } = useSwapFormStyles();
  const { keys, t } = useTranslation(translation);
  const useSwapHook = useSwap({});
  const {
    watch,
    onApprove,
    isApproving,
    onSwap,
    invalidChain,
    isSwaping,
    nonLbtcAllowance,
  } = useSwapHook;
  const { onOpen } = useWalletConnectModal();
  const { address, isConnected, connect } = useConnection();
  const { requote, sendAmount, receiveAmount } = useSelector(selectSwapState);
  const { slippageKey } = useSelector(selectSlippageState);
  const [srcSelectOpen, setSrcSelectOpen] = useState(false);
  const [dstSelectOpen, setDstSelectOpen] = useState(false);

  const [switchNetwork, { isLoading: isSwitching }] =
    useSwitchNetworkMutation();

  const chainId = SUPPORTED_CHAIN;

  const invalidSwap =
    sendAmount.isEqualTo(ZERO) || receiveAmount.isEqualTo(ZERO);

  // Tokens
  const { data: availableTokensData, isLoading: isAvailableTokensDataLoading } =
    useGetSwapAvailableTokensQuery(chainId, {
      refetchOnMountOrArgChange: ACTION_CACHE,
    });
  const availableTokens = availableTokensData?.tokens ?? {};

  const { data: tokenPricesData = {}, isLoading: isTokenPricesDataLoading } =
    useGet1inchTokenPricesQuery(
      { chain: chainId, address },
      { skip: isAvailableTokensDataLoading },
    );

  const fromTokenValue = watch('fromToken');
  const toTokenValue = watch('toToken');

  const srcToken = availableTokens[fromTokenValue] ?? {};

  const dstToken = availableTokens[toTokenValue] ?? {};

  const usdcToken = availableTokens[ETH_USDC] ?? {};

  const ethToken = availableTokens[ETH_STANDARD] ?? {};

  const { data: trustedRouterData, isLoading: isTrustedRouterDataLoading } =
    useGetSwapTrustedRouterQuery(chainId, {
      skip: isAvailableTokensDataLoading || isTokenPricesDataLoading,
    });
  const router = trustedRouterData?.address ?? '';

  // LBTC
  const { data: lbtcBalanceData } = useGetLbtcBalanceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE,
    skip: !isConnected,
  });
  const { data: lbtcAllowanceData } = useGetLbtcAllowanceQuery(
    {
      chainId,
      address: address as Address,
      spender: router,
    },
    {
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected || !router,
    },
  );
  const lbtcBalance = lbtcBalanceData?.chains[chainId] ?? ZERO;
  const lbtcAllowance = lbtcAllowanceData ?? ZERO;

  // Balance and Approval
  const { data: balancesData, isLoading: isBalancesDataLoading } =
    useGetMyAssetsQuery(
      {
        spender: router,
        walletAddress: address!,
        chainId: chainId,
        version: fromTokenValue,
      },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip:
          !isConnected ||
          !router ||
          isAvailableTokensDataLoading ||
          isTokenPricesDataLoading ||
          isTrustedRouterDataLoading,
      },
    );
  const fromBalanceData = balancesData?.find(
    b => b.address.toLowerCase() === fromTokenValue.toLowerCase(),
  );
  const isFromLBTC = fromTokenValue === LBTC_ADDRESS;
  const fromBalance = isFromLBTC
    ? lbtcBalance
    : new BigNumber(
        fromBalanceData?.wallets[address as string]?.balance ?? ZERO,
      ).dividedBy(10 ** srcToken.decimals);
  const fromAllowance = isFromLBTC
    ? lbtcAllowance.dividedBy(10 ** srcToken.decimals)
    : nonLbtcAllowance ??
      new BigNumber(
        fromBalanceData?.wallets[address as string]?.allowance ?? ZERO,
      ).dividedBy(10 ** srcToken.decimals);
  const fromApproved = fromAllowance.isGreaterThanOrEqualTo(sendAmount);
  const fromSufficient = fromBalance.isGreaterThanOrEqualTo(sendAmount);

  const toBalanceData = balancesData?.find(
    b => b.address.toLowerCase() === toTokenValue.toLowerCase(),
  );
  const isToLBTC = toTokenValue === LBTC_ADDRESS;
  const toBalance = isToLBTC
    ? lbtcBalance
    : new BigNumber(
        toBalanceData?.wallets[address as string]?.balance ?? ZERO,
      ).dividedBy(10 ** dstToken.decimals);
  const toAllowance = isToLBTC
    ? lbtcAllowance.dividedBy(10 ** dstToken.decimals)
    : new BigNumber(
        toBalanceData?.wallets[address as string]?.allowance ?? ZERO,
      ).dividedBy(10 ** srcToken.decimals);
  const toApproved = toAllowance.isGreaterThanOrEqualTo(receiveAmount);
  const toSufficient = toBalance.isGreaterThanOrEqualTo(receiveAmount);

  // Conversions
  const { data: aggregationData, isFetching: isSwapAggregationFetching } =
    useGetSwapAggregationQuery(
      { srcToken, dstToken, ethToken, chainId },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip:
          !isConnected ||
          isBalancesDataLoading ||
          isAvailableTokensDataLoading ||
          isTokenPricesDataLoading ||
          isTrustedRouterDataLoading,
      },
    );
  const {
    dstAmountData,
    usdcAmountData,
    gasUSDCAmountData,
    dstUsdcAmountData,
  } = requote.data ?? aggregationData ?? {};

  const dstAmount = (dstAmountData?.dstAmount ?? ZERO).dividedBy(
    10 ** dstToken.decimals,
  );

  const usdcAmount = (usdcAmountData?.dstAmount ?? ZERO).dividedBy(
    10 ** usdcToken.decimals,
  );

  const dstUSDCAmount = (dstUsdcAmountData?.dstAmount ?? ZERO).dividedBy(
    10 ** usdcToken.decimals,
  );

  const gas = dstAmountData?.gas ?? ZERO;
  const gasUSDCAmount = (gasUSDCAmountData?.dstAmount ?? ZERO).dividedBy(
    10 ** usdcToken.decimals,
  );

  // Gas Price
  const {
    data: gasPricePositionsData,
    isLoading: isGasPricePositionsDataLoading,
  } = useGetGasPricePositionsQuery(chainId, {
    pollingInterval: ACTION_CACHE_GAS_PRICE,
    skip:
      isBalancesDataLoading ||
      isAvailableTokensDataLoading ||
      isTokenPricesDataLoading ||
      isSwapAggregationFetching ||
      isTrustedRouterDataLoading,
  });
  const gasPrice = gasPricePositionsData
    ? BigNumber.min(
        gasPricePositionsData.medium.maxFeePerGas,
        gasPricePositionsData.baseFee.plus(
          gasPricePositionsData.medium.maxPriorityFeePerGas,
        ),
      )
    : ZERO;

  const isLoading = useMemo(
    () =>
      isAvailableTokensDataLoading ||
      isSwapAggregationFetching ||
      isBalancesDataLoading ||
      isGasPricePositionsDataLoading ||
      isTokenPricesDataLoading ||
      requote.isLoading ||
      isTrustedRouterDataLoading,
    [
      isAvailableTokensDataLoading,
      isSwapAggregationFetching,
      isBalancesDataLoading,
      isGasPricePositionsDataLoading,
      isTokenPricesDataLoading,
      requote,
      isTrustedRouterDataLoading,
    ],
  );

  const btnText = useMemo(() => {
    if (invalidChain) {
      return t(keys.invalidChain);
    }
    if (!isConnected) {
      return t(keys.connect);
    }
    if (!fromSufficient) {
      return t(keys.insufficientFunds);
    }
    if (!fromApproved) {
      return t(keys.approve);
    }
    return t(keys.swap);
  }, [t, keys, fromApproved, fromSufficient, invalidChain, isConnected]);

  const onSwapClick = useCallback(() => {
    if (invalidChain) {
      switchNetwork(SUPPORTED_CHAIN);
      return;
    }

    if (!isConnected) {
      onOpen();
      return;
    }

    if (!fromApproved) {
      onApprove(
        fromTokenValue,
        sendAmount.multipliedBy(10 ** srcToken.decimals),
      );
      return;
    }

    onSwap({
      src: fromTokenValue,
      dst: toTokenValue,
      amount: sendAmount.multipliedBy(10 ** srcToken.decimals),
      slippage: slippageValuesMap[slippageKey],
    });
  }, [
    fromApproved,
    onApprove,
    onSwap,
    fromTokenValue,
    toTokenValue,
    sendAmount,
    srcToken,
    slippageKey,
    invalidChain,
    switchNetwork,
    isConnected,
    connect,
    onOpen,
  ]);

  return (
    <SwapFormContext.Provider
      value={{
        availableTokens,
        tokenPricesData,
        isAvailableTokensDataLoading,
        srcToken,
        dstToken,
        dstAmount,
        usdcAmount,
        gasUSDCAmount,
        ethToken,
        gas,
        fromBalance,
        toBalance,
        gasPrice,
        srcSelectOpen,
        dstSelectOpen,
        setSrcSelectOpen,
        setDstSelectOpen,
        fromApproved,
        toApproved,
        fromSufficient,
        toSufficient,
        lbtcBalance,
        lbtcAllowance,
        chainId,
        dstUSDCAmount,
      }}
    >
      <Box className={classes.root} sx={{ position: 'relative' }}>
        <Typography variant="h1" className={classes.title}>
          {t(keys.swapTitle)}
        </Typography>

        <Menus sx={{ position: 'absolute', top: 20, right: 20 }} />

        <SwapField
          sx={{ marginTop: onlyMediumScreen ? 2.5 : 5 }}
          useSwap={useSwapHook}
        />

        {!onlyMediumScreen && (srcSelectOpen || dstSelectOpen) && (
          <TokenSelect useSwap={useSwapHook} />
        )}

        {onlyMediumScreen && (srcSelectOpen || dstSelectOpen) && (
          <MobileTokenSelect useSwap={useSwapHook} />
        )}

        <Fees sx={{ mt: 1.5 }} />

        <Button
          variant="contained"
          fullWidth
          className={classes.swapBtn}
          sx={{ mt: 2.5 }}
          disabled={
            (isConnected &&
              !invalidChain &&
              (!fromSufficient || invalidSwap)) ||
            isApproving ||
            isSwitching ||
            isSwaping
          }
          isLoading={isApproving || isSwitching || isSwaping}
          onClick={onSwapClick}
        >
          {btnText}
        </Button>

        <Backdrop
          sx={{ color: theme => theme.palette.common.white }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </SwapFormContext.Provider>
  );
}
