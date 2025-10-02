import { useCallback } from 'react';

import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';

import { TBtcWalletId } from 'modules/api';
import { walletsWithTestnet } from 'modules/api/btcProvider/BtcProvider';
import { useBtcConnection } from 'modules/auth';
import { IS_PROD } from 'modules/common/const';
import { sleep } from 'modules/common/utils/sleep';
import { DOWNLOAD_WALLET_LINK } from 'modules/common/walletLinks';
import { Locale, useTranslation } from 'modules/i18n';

const translation = {
  [Locale.en]: {
    disabledOnTestnet: 'Not available on testnet',
  },
};

interface IUseBtcConnectBtnAdapter {
  link?: string;
  isDisabled?: boolean;
  withInstallLabel: boolean;
  tooltip?: string;
  walletId: TBtcWalletId;
  onClick: () => void;
}

interface IUseBtcConnectBtnAdapterProps {
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
}: IUseBtcConnectBtnAdapterProps): IUseBtcConnectBtnAdapter => {
  const { keys, t } = useTranslation(translation);
  const {
    isConnected,
    walletId: currentWalletId,
    connect,
    disconnect,
  } = useBtcConnection();
  const isMobile = useDetectMobile();
  const conditionalDeepLink = isMobile ? deepLink : undefined;
  const conditionalDownloadUrl = isInjected
    ? undefined
    : DOWNLOAD_WALLET_LINK[walletId];
  const link = conditionalDeepLink ?? conditionalDownloadUrl;

  const isDisabledOnTestnet =
    !IS_PROD && !walletsWithTestnet.includes(walletId);

  const tooltip = isDisabledOnTestnet ? t(keys.disabledOnTestnet) : undefined;

  const handleClick = useCallback(async () => {
    if (!isConnected) {
      connect(walletId);
    } else if (currentWalletId !== walletId) {
      disconnect();
      await sleep(100);
      connect(walletId);
    }
  }, [connect, walletId]);

  return {
    walletId,
    link: isInjected ? undefined : link,
    isDisabled: isDisabled || (isDisabledOnTestnet && isInjected),
    withInstallLabel: !isMobile && !!conditionalDownloadUrl,
    tooltip,
    onClick: handleClick,
  };
};
