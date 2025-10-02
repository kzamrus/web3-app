import { useBtcConnection } from 'modules/auth';
import { useBtcConnectionModal } from 'modules/auth/hooks/useBtcConnectionModal';
import { validateBitcoinAddr } from 'modules/common/utils/validateBitcoinAddr';
import { globalTranslation, useTranslation } from 'modules/i18n';
import { useCallback } from 'react';

interface IUseAddressField {
  address?: string;
  isConnected: boolean;
  btcWallet?: string;
  validate: (value: string) => string | undefined;
  onConnectClick: () => void;
}

export function useAddressField(): IUseAddressField {
  const { keys: globalKeys, t } = useTranslation(globalTranslation);
  const { isConnected, address, walletId, disconnect } = useBtcConnection();
  const { onOpen } = useBtcConnectionModal();

  const validate = useCallback(
    (value: string) => {
      if (!value) {
        return t(globalKeys.validation.required);
      }
      if (!validateBitcoinAddr(value)) {
        return t(globalKeys.validation.address);
      }

      return undefined;
    },
    [t, globalKeys],
  );

  const onConnectClick = isConnected ? disconnect : onOpen;

  return {
    address,
    isConnected,
    btcWallet: walletId,
    validate,
    onConnectClick,
  };
}
