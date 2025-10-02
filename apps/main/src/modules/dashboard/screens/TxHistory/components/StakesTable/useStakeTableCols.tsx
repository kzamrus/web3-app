import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BigNumber from 'bignumber.js';
import { BITCOIN_NETWORK, OLstToken, ONativeToken } from 'modules/api';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { DECIMAL_PLACES_BTC } from 'modules/common/const';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { NetworkCell } from '../NetworkCell';
import { translation } from './translation';
import { IStakeRow, OStakeRow } from './types';

export function useStakeTableCols(): GridColDef<IStakeRow>[] {
  const { keys, t } = useTranslation(translation);

  return useMemo<GridColDef<IStakeRow>[]>(
    () => [
      {
        field: OStakeRow.date,
        headerName: t(keys.dateAndTime),
        flex: 1,
        minWidth: 190,
      },
      {
        field: OStakeRow.txHash,
        headerName: t(keys.txHash),
        flex: 1,
        minWidth: 160,
        valueFormatter: value => getShortAddr(value),
        renderCell: renderTxHashCell,
      },
      {
        field: OStakeRow.amountSent,
        headerName: t(keys.amountSent),
        flex: 1,
        minWidth: 140,
        valueFormatter: (amount: BigNumber) =>
          t('unit.tokenValue', {
            token: ONativeToken.BTC,
            value: amount.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
          }),
      },
      {
        field: OStakeRow.amountReceive,
        headerName: t(keys.amountReceive),
        flex: 1,
        minWidth: 160,
        valueFormatter: (amount: BigNumber) =>
          t('unit.tokenValue', {
            token: OLstToken.LBTC,
            value: amount.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
          }),
      },
      {
        field: OStakeRow.chainId,
        headerName: t(keys.destination),
        flex: 1,
        minWidth: 180,
        renderCell: ({ row: { chainId } }) => <NetworkCell chainId={chainId} />,
      },
      {
        field: OStakeRow.status,
        headerName: t(keys.status),
        minWidth: 80,
      },
    ],
    [keys, t],
  );
}

function renderTxHashCell({
  value,
  formattedValue,
}: GridRenderCellParams<any, string>) {
  const explorerLink = value
    ? getExplorerLink(value, BITCOIN_NETWORK)
    : undefined;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Typography>{formattedValue}</Typography>

      {explorerLink && (
        <ExternalLink explorerLink={explorerLink} sx={{ ml: 0 }} />
      )}
    </Box>
  );
}
