import { GridColDef } from '@mui/x-data-grid';
import { BITCOIN_NETWORK, OLstToken, ONativeToken } from 'modules/api';
import { DECIMAL_PLACES_BTC, SECURITY_FEE } from 'modules/common/const';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { NetworkCell } from '../NetworkCell';
import { BtcAddressCell } from './BtcAddressCell';
import { StatusCell } from './StatusCell';
import { translation } from './translation';
import { IUnstakeTableRow, OUnstakeCols } from './types';

export function useUnstakeTableCols(): GridColDef<IUnstakeTableRow>[] {
  const { keys, t } = useTranslation(translation);

  return useMemo<GridColDef<IUnstakeTableRow>[]>(
    () => [
      {
        field: OUnstakeCols.date,
        headerName: t(keys.dateAndTime),
        flex: 1,
        minWidth: 190,
        valueFormatter: (_, { date }) => {
          const formattedDate = t('format.date', { value: date });
          const time = t('format.timeShort', { value: date });

          return `${formattedDate}, ${time}`;
        },
      },
      {
        field: OUnstakeCols.network,
        headerName: t(keys.unstakeNetwork),
        flex: 1,
        minWidth: 160,
        renderCell: ({ row: { fromChain, txId } }) => (
          <NetworkCell
            chainId={fromChain}
            explorerLink={getExplorerLink(txId, fromChain)}
          />
        ),
      },
      {
        field: OUnstakeCols.amountSent,
        headerName: t(keys.amountSent),
        flex: 1,
        minWidth: 180,
        valueFormatter: (_, { amount }) => {
          // todo: get somewhere real sent amount
          const amountSent = amount.plus(SECURITY_FEE);

          return t('unit.tokenValue', {
            token: OLstToken.LBTC,
            value: amountSent.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
          });
        },
      },
      {
        field: OUnstakeCols.btcAddress,
        headerName: t(keys.btcAddress),
        flex: 1,
        minWidth: 200,
        renderCell: ({ row: { btcAddress } }) => (
          <BtcAddressCell address={btcAddress} />
        ),
      },
      {
        field: OUnstakeCols.amountReceive,
        headerName: t(keys.amountReceive),
        flex: 1,
        minWidth: 180,
        valueFormatter: (_, { amount }) =>
          t('unit.tokenValue', {
            token: ONativeToken.BTC,
            value: amount.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
          }),
      },
      {
        field: OUnstakeCols.status,
        headerName: t(keys.status),
        minWidth: 140,
        renderCell: ({ row: { payoutTxid } }) => (
          <StatusCell
            explorerLink={
              payoutTxid
                ? getExplorerLink(payoutTxid, BITCOIN_NETWORK)
                : undefined
            }
          />
        ),
      },
    ],
    [keys, t],
  );
}
