import { useCallback } from 'react';

import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';

import { TEvmWalletId } from 'modules/api';
import { useConnection } from 'modules/auth';
import { IConnectBtnProps } from 'modules/auth/components/ConnectBtn';

type TConnectBtnAdapter = Omit<IConnectBtnProps, 'title' | 'iconSlot'> & {
  isMobile: boolean;
};

interface IWalletConnectBtn {
  walletId: TEvmWalletId;
  isDisabled?: boolean;
  isInjected?: boolean;
  downloadUrl: string;
  deepLink?: string;
}

export const useConnectBtnAdapter = ({
  deepLink,
  downloadUrl,
  isInjected,
  walletId,
  isDisabled,
}: IWalletConnectBtn): TConnectBtnAdapter => {
  const { connect, isLoading, isConnected } = useConnection();
  const isMobile = useDetectMobile();
  const conditionalDeepLink = isMobile ? deepLink : undefined;
  const conditionalDownloadUrl = isInjected ? undefined : downloadUrl;
  const link = conditionalDeepLink ?? conditionalDownloadUrl;

  const handleClick = useCallback(() => {
    connect(walletId);
  }, [connect, walletId]);

  return {
    link: isInjected ? undefined : link,
    isDisabled: isDisabled || isLoading || isConnected,
    isLoading,
    withInstallLabel: !isMobile && !!conditionalDownloadUrl,
    isMobile,
    onClick: handleClick,
  };
};
