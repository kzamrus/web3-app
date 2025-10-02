import { Box, Typography } from '@mui/material';
import { useSwapFieldStyles } from './useSwapFieldStyles';
import { TToken } from 'modules/api/sdk/getSwapAvailableTokens';

export function TokenSelectedValue({ token }: { token: TToken }): JSX.Element {
  const { classes } = useSwapFieldStyles();

  return (
    <Box className={classes.tokenSelected}>
      <Typography
        component="img"
        className={classes.tokenSelectIcon}
        src={token.logoURI ?? ''}
      />
      <Typography sx={{ ml: 0.75, textTransform: 'uppercase' }}>
        {token.symbol}
      </Typography>
    </Box>
  );
}
