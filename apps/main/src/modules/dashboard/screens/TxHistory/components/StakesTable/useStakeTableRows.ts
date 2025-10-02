import BigNumber from 'bignumber.js';
import { IDeposit } from 'modules/api';
import { useTranslation } from 'modules/i18n';
import { useCallback, useMemo } from 'react';
import { useClaimedStakes } from '../../hooks/useClaimedStakes';
import { translation } from './translation';
import { IStakeRow, OStakeRow } from './types';

interface IUseStakeTableRows {
  rows: IStakeRow[];
  isLoading: boolean;
}

export function useStakeTableRows(): IUseStakeTableRows {
  const { claimedStakes, isLoading } = useClaimedStakes();
  const { keys, t } = useTranslation(translation);

  const mapStakeRow = useCallback(
    (el: IDeposit): IStakeRow => {
      const date = el.blockTime ? new Date(el.blockTime * 1000) : new Date();
      const formattedDate = t('format.date', { value: date });
      const time = t('format.timeShort', { value: date });
      const amount = new BigNumber(el.value);

      return {
        id: `${el.txid}-${el.index}`,
        [OStakeRow.date]: el.blockTime ? `${formattedDate}, ${time}` : '—',
        [OStakeRow.txHash]: el.txid,
        [OStakeRow.amountSent]: amount,
        [OStakeRow.amountReceive]: amount,
        [OStakeRow.chainId]: el.chainId,
        [OStakeRow.status]: t(keys.completed),
      };
    },
    [t, keys],
  );

  const rows = useMemo(
    () => claimedStakes.map(mapStakeRow) ?? [],
    [claimedStakes, mapStakeRow],
  );

  return {
    rows,
    isLoading,
  };
}
