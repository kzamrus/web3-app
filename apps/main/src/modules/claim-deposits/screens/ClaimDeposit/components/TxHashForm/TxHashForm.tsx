import { FormHelperText, FormLabel, Paper, Typography } from '@mui/material';
import { claimDepositsRouteConfig } from 'modules/claim-deposits/getClaimDepositsRoutes';
import { Button } from 'modules/common/components/Button';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { InputBase } from 'modules/common/components/InputBase';
import { validateBitcoinTxId } from 'modules/common/utils/validateBitcoinTxId';
import { dashboardRouteConfig } from 'modules/dashboard';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const INPUT_ID = 'txHash';

interface IFormValues {
  txHash: string;
}

export function TxHashForm(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = handleSubmit(({ txHash }) => {
    const path = claimDepositsRouteConfig.claim.generatePath(txHash);
    navigate(path);
  });

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        position: 'relative',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography sx={{ mb: 2, textAlign: 'center' }} variant="h2">
        Claim LBTC tokens
      </Typography>

      <Typography sx={{ mb: 4, textAlign: 'center' }}>
        You can claim your LBTC tokens by providing the transaction hash of the
        deposit on the Bitcoin network.
      </Typography>

      <div>
        <FormLabel htmlFor={INPUT_ID} sx={{ display: 'flex', mb: 1 }}>
          Transaction hash
        </FormLabel>

        <InputBase
          {...register('txHash', {
            validate: validateTxHash,
          })}
          defaultValue=""
          id={INPUT_ID}
          fullWidth
          placeholder="Paste transaction hash"
        />

        {errors.txHash && (
          <FormHelperText sx={{ mt: 1 }} error>
            {errors.txHash.message}
          </FormHelperText>
        )}
      </div>

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mt: 4 }}
        type="submit"
      >
        Check deposit
      </Button>

      <CloseBtn
        component={Link}
        to={dashboardRouteConfig.main.generatePath()}
      />
    </Paper>
  );
}

function validateTxHash(txHash: string): string | undefined {
  if (!txHash) {
    return 'Required';
  }

  if (!validateBitcoinTxId(txHash)) {
    return 'Invalid transaction hash';
  }

  return undefined;
}
