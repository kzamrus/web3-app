import { useCallback } from 'react';

import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';

import { TBtcWalletId } from 'modules/api';
import { walletsWithTestnet } from 'modules/api/btcProvider/BtcProvider';
import { useBtcConnection } from 'modules/auth';
import { IConnectBtnProps } from 'modules/auth/components/ConnectBtn';
import { IS_PROD } from 'modules/common/const';
import { DOWNLOAD_WALLET_LINK } from 'modules/common/walletLinks';
import { Locale, useTranslation } from 'modules/i18n';

const translation = {
  [Locale.en]: {
    disabledOnTestnet: 'Not available on testnet',
  },
};

type TConnectBtnAdapter = Omit<IConnectBtnProps, 'title' | 'iconSlot'> & {
  isMobile: boolean;
};

interface IWalletConnectBtn {
  walletId: TBtcWalletId;
  isDisabled?: boolean;
  isInjected?: boolean;
  deepLink?: string;
}

export const useBtcConnectBtnAdapter = ({
  deepLink,
  isInjected,
  walletId,
  isDisabled,
}: IWalletConnectBtn): TConnectBtnAdapter => {
  const { keys, t } = useTranslation(translation);
  const { isLoading, isConnected, connect } = useBtcConnection();
  const isMobile = useDetectMobile();
  const conditionalDeepLink = isMobile ? deepLink : undefined;
  const conditionalDownloadUrl = isInjected
    ? undefined
    : DOWNLOAD_WALLET_LINK[walletId];
  const link = conditionalDeepLink ?? conditionalDownloadUrl;

  const isDisabledOnTestnet =
    !IS_PROD && !walletsWithTestnet.includes(walletId);

  const tooltip = isDisabledOnTestnet ? t(keys.disabledOnTestnet) : undefined;

  const handleClick = useCallback(() => {
    connect(walletId);
  }, [connect, walletId]);

  return {
    link: isInjected ? undefined : link,
    isDisabled:
      isDisabled ||
      isLoading ||
      isConnected ||
      (isDisabledOnTestnet && isInjected),
    isLoading,
    withInstallLabel: !isMobile && !!conditionalDownloadUrl,
    isMobile,
    tooltip,
    onClick: handleClick,
  };
};
