import { InputBase } from 'modules/common/components/InputBase';
import { useTranslation } from 'modules/i18n';
import { UseFormReturn, useController } from 'react-hook-form';
import { translation } from './translation';
import { IEarlyAccessFormValues } from './types';
import { useEarlyAccessStyles } from './useEarlyAccessStyles';

// 8-9 char alphanumeric code string
const accessCodeRegex = /^[a-zA-Z0-9]{8,9}$/;

type AccessCodeFieldProps = Pick<
  UseFormReturn<IEarlyAccessFormValues>,
  'control'
> & {
  disabled?: boolean;
};

export function AccessCodeField({
  control,
  disabled,
}: AccessCodeFieldProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useEarlyAccessStyles();

  const validate = (value: string) => {
    if (!value) {
      return 'Required';
    }

    if (!accessCodeRegex.test(value)) {
      return t(keys.invalidCode);
    }

    return undefined;
  };

  const { field } = useController({
    name: 'accessCode',
    control,
    rules: { validate },
  });

  return (
    <InputBase
      fullWidth
      {...field}
      className={classes.input}
      placeholder={t(keys.enterCode)}
      disabled={disabled}
    />
  );
}
