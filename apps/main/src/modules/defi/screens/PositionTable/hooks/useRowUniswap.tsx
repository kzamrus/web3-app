import { skipToken } from '@reduxjs/toolkit/query';
import { OChainId, OProtocol } from 'modules/api';
import { ACTION_CACHE_LONG } from 'modules/common/const';

import { useGetLombaPointsFromSentioQueryQuery } from '../../actions/getLombaPointsFromSentio';
import { useGetLpTvlFromSentioQuery } from '../../actions/getLpTvlFromSentio';
import IconUniswap from '../assets/protocols/Uniswap.svg?react';
import { IUseProtocolRow } from './types';

const asset = 'LBTC / WBTC';
const protocolName = 'Uniswap v3';
const chainId = OChainId.ethereum;

const poolLink =
  'https://app.uniswap.org/explore/pools/ethereum/0x87428a53e14d24ab19c6ca4939b4df93b8996ca9?chain=mainnet';

export function useRowUniswap(
  address?: string,
): Omit<IUseProtocolRow, 'position'> {
  const { data: tvl = 0 } = useGetLpTvlFromSentioQuery({
    protocol: OProtocol.Uniswap,
  });

  const { data: pointsData, isLoading: isPointsLoading } =
    useGetLombaPointsFromSentioQueryQuery(address ? { address } : skipToken, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
    });

  const isLoading = isPointsLoading;

  return {
    isLoading,
    asset,
    protocolName,
    tvl,
    poolLink,
    protocolIcon: IconUniswap,
    chainId,
    multiplier: pointsData?.uniswapMultiplier ?? 0,
    LBTCBalance: pointsData?.uniswapLBTCBalance ?? 0,
    wBTCBalance: pointsData?.uniswapWBTCBalance ?? 0,
  };
}
