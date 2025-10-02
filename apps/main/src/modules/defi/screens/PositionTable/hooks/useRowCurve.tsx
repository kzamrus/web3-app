import { OChainId, OProtocol } from 'modules/api';
import curveIcon from '../assets/protocols/curve.png';
import { IUseProtocolRow } from './types';
import { useGetLpTvlFromSentioQuery } from '../../actions/getLpTvlFromSentio.ts';
import { useGetLombaPointsFromSentioQueryQuery } from '../../actions/getLombaPointsFromSentio.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { ACTION_CACHE_LONG } from '../../../../common/const.ts';

const asset = 'LBTC / WBTC';
const protocolName = 'Curve';
const chainId = OChainId.ethereum;

const poolLink =
  'https://curve.fi/#/ethereum/pools/factory-stable-ng-244/deposit';

export function useRowCurve(
  address?: string,
): Omit<IUseProtocolRow, 'position'> {
  const { data: tvl = 0 } = useGetLpTvlFromSentioQuery({
    protocol: OProtocol.Curve,
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
    protocolIcon: curveIcon,
    chainId,
    multiplier: pointsData?.curveMultiplier ?? 0,
    LBTCBalance: pointsData?.curveLBTCBalance ?? 0,
    wBTCBalance: pointsData?.curveWBTCBalance ?? 0,
  };
}
