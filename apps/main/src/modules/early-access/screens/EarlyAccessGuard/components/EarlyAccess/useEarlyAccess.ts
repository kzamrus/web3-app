import { useAccessInfo } from 'modules/early-access/hooks/useAccessInfo';
import { FormEventHandler } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { IEarlyAccessFormValues } from './types';

interface IUseEarlyAccess {
  form: UseFormReturn<IEarlyAccessFormValues>;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function useEarlyAccess(): IUseEarlyAccess {
  const form = useForm<IEarlyAccessFormValues>({
    defaultValues: {
      accessCode: '',
    },
  });

  const { isLoading, submitCode } = useAccessInfo();

  const onSubmit = form.handleSubmit(({ accessCode }) => {
    submitCode(accessCode);
  });

  return {
    form,
    isSubmitting: isLoading,
    onSubmit,
  };
}
