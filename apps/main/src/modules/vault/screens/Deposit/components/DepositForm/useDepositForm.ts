import { useBoringVaultV1 } from 'boring-vault-ui';
import { OChainId, TChainId } from 'modules/api';
import { IS_PROD } from 'modules/common/const';
import { useVaultProvider } from 'modules/vault/hooks/useVaultProvider';
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Tokens } from '../../types';

export interface IDepositlFormValues {
  amount: string;
  chain: TChainId;
  selectedToken: Tokens;
}

interface IDepositlForm {
  form: UseFormReturn<IDepositlFormValues>;
  status: Record<string, string | undefined> | undefined;
  isLoading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const defaultChainValue = IS_PROD ? OChainId.ethereum : OChainId.holesky;

export function useDepositForm(): IDepositlForm {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<IDepositlForm['status']>(undefined);
  const { deposit, depositStatus, depositTokens } = useBoringVaultV1();

  const form = useForm<IDepositlFormValues>({
    defaultValues: {
      selectedToken: Tokens.LBTC,
      chain: defaultChainValue,
      amount: '',
    },
  });

  const provider = useVaultProvider();

  const onSubmit = form.handleSubmit(async values => {
    setLoading(true);
    if (!provider) {
      setLoading(false);
      return;
    }

    const selectedToken = depositTokens.find(
      el => el.displayName === values.selectedToken,
    )!;

    deposit(await provider.getSigner(), values.amount, {
      address: selectedToken.address,
      decimals: selectedToken.decimals,
    });
  });

  useEffect(() => {
    if (depositStatus.loading) {
      setLoading(true);
    } else if (depositStatus.success) {
      setStatus({
        txId: depositStatus.tx_hash,
        amount: form.getValues('amount'),
      });

      setLoading(false);
    } else if (depositStatus.error) {
      setLoading(false);
    }
  }, [form, depositStatus]);

  return {
    form,
    status,
    isLoading,
    onSubmit,
  };
}
