import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

interface IAllocationTableRowProps {
  image: React.ReactElement;
  label: string;
  trailing: string;
  allocation: string;
  cellClassName?: string;
  className?: string;
}

export const AllocationTableRow: FC<IAllocationTableRowProps> = ({
  trailing,
  cellClassName,
  className,
  image,
  label,
  allocation,
}) => (
  <TableRow className={className}>
    <TableCell className={cellClassName}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {image}
        <Typography variant="body1">{label}</Typography>
      </Box>
    </TableCell>
    <TableCell className={cellClassName}>
      <Typography variant="body1">{allocation}</Typography>
    </TableCell>
    <TableCell sx={{ textAlign: 'right' }} className={cellClassName}>
      <Typography variant="body1">{trailing}</Typography>
    </TableCell>
  </TableRow>
);
