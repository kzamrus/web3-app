import { useBoringVaultV1 } from 'boring-vault-ui';
import { useVaultProvider } from 'modules/vault/hooks/useVaultProvider';
import { FormEventHandler, useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

export interface IWithdrawalFormValues {
  amount: string;
  txId: string;
}

interface IWithdrawalForm {
  isLoading: boolean;
  status: Record<string, string> | undefined;
  form: UseFormReturn<IWithdrawalFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const WITHDRAW_DISCOUNT_PERCENT = '0.01';
const WITHDRAW_DAYS_VALID = '3';

export function useWithdrawalForm(): IWithdrawalForm {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<IWithdrawalForm['status']>(undefined);

  const form = useForm<IWithdrawalFormValues>({
    defaultValues: {
      amount: '',
    },
  });

  const { isBoringV1ContextReady, queueWithdraw, withdrawStatus } =
    useBoringVaultV1();

  const provider = useVaultProvider();

  const onSubmit = form.handleSubmit(async values => {
    setLoading(true);
    if (!isBoringV1ContextReady || !provider) {
      setLoading(false);
      return;
    }

    const signer = await provider.getSigner();
    try {
      await queueWithdraw(
        signer,
        values.amount,
        {
          displayName: 'LBTC',
          address: '0x8236a87084f8B84306f72007F36F2618A5634494',
          decimals: 8,
        },
        WITHDRAW_DISCOUNT_PERCENT,
        WITHDRAW_DAYS_VALID,
      );
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (withdrawStatus.loading) {
      setLoading(true);
    } else if (withdrawStatus.success) {
      setLoading(false);
      setStatus({
        txId: withdrawStatus.tx_hash!,
        amount: form.getValues('amount'),
      });
    }
  }, [withdrawStatus]);

  return {
    form,
    isLoading,
    status,
    onSubmit,
  };
}
