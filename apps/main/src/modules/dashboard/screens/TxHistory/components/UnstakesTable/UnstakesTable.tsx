import { DataGrid } from '@mui/x-data-grid';
import { NoRowsOverlay } from '../NoRowsOverlay';
import { useUnstakeTableCols } from './useUnstakeTableCols';
import { useUnstakeTableRows } from './useUnstakeTableRows';

export function UnstakesTable(): JSX.Element {
  const columns = useUnstakeTableCols();
  const { rows, isLoading } = useUnstakeTableRows();

  return (
    <DataGrid
      autoHeight
      disableColumnResize
      disableColumnMenu
      disableColumnSorting
      disableRowSelectionOnClick
      slots={{ noRowsOverlay: NoRowsOverlay }}
      loading={isLoading}
      columns={columns}
      rows={rows}
      sx={{ mx: '-10px' }}
    />
  );
}
