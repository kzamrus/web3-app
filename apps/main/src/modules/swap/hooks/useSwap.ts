import { Address } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { OChainId } from 'modules/api';
import { ISwapCalldataParams } from 'modules/api/sdk/getSwapCalldata';
import { useConnection } from 'modules/auth';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { ACTION_CACHE_LONG } from 'modules/common/const';
import { useApproveMutation } from 'modules/swap/actions/approve';
import { useLazyGetSwapApprovalCalldataQuery } from 'modules/swap/actions/getSwapApprovalCalldata';
import { useLazyGetSwapCalldataQuery } from 'modules/swap/actions/getSwapCalldata';
import { useSwapMutation } from 'modules/swap/actions/swap';
import {
  DEFAULT_FROM_TOKEN,
  DEFAULT_TO_TOKEN,
  LBTC_ADDRESS,
} from 'modules/swap/const';
import { SwapFormValues } from 'modules/swap/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormState, UseFormReturn, useForm } from 'react-hook-form';

interface IUseSwapArgs {}

type SwapArgs = Omit<ISwapCalldataParams, 'from' | 'origin'>;

export interface IUseSwap
  extends Pick<
      UseFormReturn<SwapFormValues>,
      'control' | 'handleSubmit' | 'watch' | 'register' | 'setValue'
    >,
    Pick<FormState<SwapFormValues>, 'errors'> {
  btcPrice: number;
  onApprove: (tokenAddress: Address, amount: BigNumber) => void;
  onSwap: (args: SwapArgs) => void;
  isApproving: boolean;
  isSwaping: boolean;
  invalidChain: boolean;
  nonLbtcAllowance?: BigNumber;
}

export function useSwap({}: IUseSwapArgs): IUseSwap {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<SwapFormValues>({
    defaultValues: {
      fromToken: DEFAULT_FROM_TOKEN,
      fromAmount: '',
      toToken: DEFAULT_TO_TOKEN,
      toAmount: '',
    },
  });
  const [nonLbtcAllowance, setNonLbtcAllowance] = useState<BigNumber>();

  const { address, chainId, isConnected } = useConnection();

  const [approve, { isLoading: isApproving }] = useApproveMutation();

  const [swap, { isLoading: isSwaping }] = useSwapMutation();

  const { data: btcPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const [getApprovalCalldata, { isFetching: isApprovalCalldataLoading }] =
    useLazyGetSwapApprovalCalldataQuery();

  const [getSwapCalldata, { isFetching: isSwapCalldataLoading }] =
    useLazyGetSwapCalldataQuery();

  const onSwapSuccess = useCallback(() => {
    setValue('fromAmount', '');
    setValue('toAmount', '');
  }, [setValue]);

  const fromTokenValue = watch('fromToken');

  // If src token changed, the temporary cache should be reset.
  useEffect(() => {
    setNonLbtcAllowance(undefined);
  }, [fromTokenValue]);

  const onApprove = useCallback(
    async (tokenAddress: Address, amount: BigNumber) => {
      if (!address) return;

      const { data: approvalCalldata } = await getApprovalCalldata({
        tokenAddress,
        amount: amount.toString(),
      });

      if (!approvalCalldata) {
        throw new Error('Approval calldata is empty');
      }

      approve({
        from: address,
        to: approvalCalldata.to,
        sendOptions: {
          data: approvalCalldata.data,
          value: approvalCalldata.value,
        },
      })
        .unwrap()
        .then(() => {
          if (tokenAddress !== LBTC_ADDRESS) setNonLbtcAllowance(amount);
        })
        .catch(error => console.error(error));
    },
    [address],
  );

  const onSwap = useCallback(
    async (args: SwapArgs) => {
      if (!address) return;

      const { data: swapCalldata } = await getSwapCalldata({
        ...args,
        from: address,
        origin: address,
      });

      if (!swapCalldata) {
        throw new Error('Swap calldata is empty');
      }

      swap({
        from: swapCalldata.tx.from,
        to: swapCalldata.tx.to,
        sendOptions: {
          data: swapCalldata.tx.data,
          value: swapCalldata.tx.value.toString(),
        },
      })
        .unwrap()
        .then(onSwapSuccess)
        .catch(error => console.error(error));
    },
    [address, onSwapSuccess],
  );

  const invalidChain = useMemo(() => {
    return isConnected && chainId !== OChainId.ethereum;
  }, [chainId, isConnected]);

  return {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    errors,
    onSwap,
    btcPrice,
    onApprove,
    isApproving: isApproving || isApprovalCalldataLoading,
    isSwaping: isSwaping || isSwapCalldataLoading,
    invalidChain,
    nonLbtcAllowance,
  };
}
