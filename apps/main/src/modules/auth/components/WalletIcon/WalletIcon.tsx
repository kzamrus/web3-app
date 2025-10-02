import { OBtcWalletId, OEvmWalletId } from 'modules/api';
import { FC, useMemo } from 'react';
import { default as BitgetIcon } from './assets/bitget.svg?react';
import { default as WalletConnectIcon } from './assets/wallet-connect.svg?react';
import { default as MetaMaskIcon } from './assets/metamask.svg?react';
import { default as OkxWalletIcon } from './assets/okx.svg?react';
import { default as TomoIcon } from './assets/tomo.svg?react';
import { default as DefaultWalletIcon } from './assets/wallet-icon.svg?react';
import { default as XverseIcon } from './assets/xverse.svg?react';
import { useWalletIconStyles } from './useWalletIconStyles';

interface IWalletIconProps {
  wallet?: string;
  title?: string;
  className?: string;
}

export function WalletIcon({
  wallet,
  title,
  className,
}: IWalletIconProps): JSX.Element {
  const { classes, cx } = useWalletIconStyles();
  const Icon = useMemo(() => getWalletIcon(wallet), [wallet]);

  return <Icon className={cx(classes.root, className)} title={title} />;
}

function getWalletIcon(
  wallet?: string,
): FC<{ className?: string; title?: string }> {
  switch (wallet) {
    case OEvmWalletId.injected:
      return MetaMaskIcon;

    case OEvmWalletId.walletconnect:
      return WalletConnectIcon;

    case OBtcWalletId.OKX:
    case OEvmWalletId.okxwallet:
      return OkxWalletIcon;

    case OBtcWalletId.Xverse:
      return XverseIcon;

    case OBtcWalletId.Tomo:
    case OEvmWalletId.tomo:
      return TomoIcon;

    case OBtcWalletId.Bitget:
    case OEvmWalletId.bitget:
      return BitgetIcon;

    default:
      return DefaultWalletIcon;
  }
}
