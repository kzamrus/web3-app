import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TFunction, useTranslation } from 'modules/i18n';
import { useCurrentAllocationsWidgetStyles } from './useCurrentAllocationsWidgetStyles';
import { translation } from './translation';

import { default as Pendle } from '../../assets/pendle.svg?react';
import { default as Curve } from '../../assets/Curve.svg?react';
import { default as Uniswap } from '../../assets/Uniswap.svg?react';
import { default as Gearbox } from '../../assets/Gear.svg?react';
import { default as Morpho } from '../../assets/Morpho.svg?react';
import { AllocationTableRow } from './AllocationTableRow';

const TRAILING = 'TBD';

const renderItems = (t: TFunction, keys: Record<string, string>) => [
  {
    label: t(keys.label1),
    allocation: t(keys.tbd),
    image: <Pendle />,
    trailing: TRAILING,
  },
  {
    label: t(keys.label2),
    allocation: t(keys.tbd),
    image: <Curve />,
    trailing: TRAILING,
  },
  {
    label: t(keys.label3),
    allocation: t(keys.tbd),
    image: <Uniswap />,
    trailing: TRAILING,
  },
  {
    label: t(keys.label4),
    allocation: t(keys.tbd),
    image: <Gearbox />,
    trailing: TRAILING,
  },
  {
    label: t(keys.label5),
    allocation: t(keys.tbd),
    image: <Morpho />,
    trailing: TRAILING,
  },
];

export const CurrentAllocationsWidget = () => {
  const { t, keys } = useTranslation(translation);
  const { classes } = useCurrentAllocationsWidgetStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Box>
          <Typography className={classes.title} component="h3">
            {t(keys.title)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.scrollContainer}>
        <Box className={classes.paper}>
          <Box className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography className={classes.headerCell}>
                      {t(keys.head1)}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Typography className={classes.headerCell}>
                      {t(keys.head2)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: 'right' }}
                    className={classes.cell}
                  >
                    <Typography className={classes.headerCell}>
                      {t(keys.head3)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderItems(t, keys).map(
                  ({ label, image, allocation, trailing }, id) => (
                    <AllocationTableRow
                      key={`${id}-${label}`}
                      label={label}
                      allocation={allocation}
                      image={image}
                      cellClassName={classes.cell}
                      trailing={trailing}
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
