import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '../../../i18n';
import { OSlippageKey, slippageValuesMap, TSlippageKey } from '../../const';
import { useSlippageVariantModal } from '../../hooks/useSlippageVariantModal';
import { changeSlippage, selectSlippageState } from '../../store/slippageSlice';
import { translation } from './translation';
import { useSlippageSettingStyles } from './useSlippageSettingStyles';

interface ISlippageBtnProps {
  slippageKey: TSlippageKey;
}

export function SlippageBtn({ slippageKey }: ISlippageBtnProps): JSX.Element {
  const { cx } = useSlippageSettingStyles();
  const dispatch = useDispatch();
  const { onClose } = useSlippageVariantModal();
  const { slippageKey: currentSlippage } = useSelector(selectSlippageState);
  const { t, keys } = useTranslation(translation);

  const onSlippageChange = useCallback(() => {
    dispatch(changeSlippage({ slippageKey }));
    onClose();
  }, [dispatch]);

  const label =
    slippageKey === OSlippageKey.auto
      ? t(keys.auto)
      : t('unit.pctValue', {
          value: slippageValuesMap[slippageKey],
        });

  return (
    <Button
      onClick={onSlippageChange}
      className={cx({ active: slippageKey === currentSlippage })}
    >
      {label}
    </Button>
  );
}
