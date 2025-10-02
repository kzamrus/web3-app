import { OChainId } from 'modules/api';
import { IS_PROD } from 'modules/common/const';
import { useUnstakeMutation } from 'modules/unstake/actions/unstake';
import { unstakeRoutesConfig } from 'modules/unstake/unstakeRoutesConfig';
import { FormEventHandler } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUnstakingFormValues } from '../../types';

const defaultChainValue = IS_PROD ? OChainId.ethereum : OChainId.holesky;

interface IUseUnstakeForm {
  form: UseFormReturn<IUnstakingFormValues>;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function useUnstakeForm(): IUseUnstakeForm {
  const navigate = useNavigate();

  const form = useForm<IUnstakingFormValues>({
    defaultValues: {
      chain: defaultChainValue,
      amount: '',
      btcAddress: '',
    },
  });

  const [unstake, { isLoading }] = useUnstakeMutation();

  const onSubmit = form.handleSubmit(values => {
    unstake({
      amount: values.amount,
      address: values.btcAddress,
      chainId: values.chain,
    })
      .unwrap()
      .then(txHash => {
        const path = unstakeRoutesConfig.status.generatePath({
          txHash,
          network: values.chain.toString(),
          amount: values.amount,
        });
        navigate(path);
      })
      .catch(() => {});
  });

  return {
    form,
    isSubmitting: isLoading,
    onSubmit,
  };
}
