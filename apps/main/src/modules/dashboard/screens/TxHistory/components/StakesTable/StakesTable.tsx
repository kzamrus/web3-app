import { DataGrid } from '@mui/x-data-grid';
import { NoRowsOverlay } from '../NoRowsOverlay';
import { useStakeTableCols } from './useStakeTableCols';
import { useStakeTableRows } from './useStakeTableRows';

export function StakesTable(): JSX.Element {
  const columns = useStakeTableCols();
  const { isLoading, rows } = useStakeTableRows();

  return (
    <DataGrid
      autoHeight
      disableColumnResize
      disableColumnMenu
      disableColumnSorting
      disableRowSelectionOnClick
      slots={{ noRowsOverlay: NoRowsOverlay }}
      columns={columns}
      loading={isLoading}
      rows={rows}
      sx={{ mx: '-10px' }}
    />
  );
}
