import { forwardRef } from 'react';

import { ETH_DECIMALS } from 'modules/common/const';

import { IInputBaseProps, InputBase } from '../InputBase';

import { useInputNumber } from './useInputNumber';

export interface IInputNumberProps extends IInputBaseProps {
  isIntegerOnly?: boolean;
  maxDecimalsLen?: number;
}

/**
 * Input wrapper that allows only numbers.
 */
export const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>(
  (
    {
      isIntegerOnly,
      maxDecimalsLen = ETH_DECIMALS,
      onKeyDown,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const {
      onKeyDown: handleKeyDown,
      onWheel: handleWheel,
      onChange: handleChange,
    } = useInputNumber({
      isIntegerOnly,
      maxDecimalsLen,
      onChange,
      onKeyDown,
    });

    return (
      <InputBase
        type="number"
        {...restProps}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      />
    );
  },
);

InputNumber.displayName = 'InputNumber';
