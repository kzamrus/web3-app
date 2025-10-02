// import { bridgeRoutesConfig } from 'modules/bridge';
import { featureConfig } from 'modules/common/featureConfig';
import { dashboardRouteConfig } from 'modules/dashboard';
import { defiRoutesConfig } from 'modules/defi';
import { useTranslation } from 'modules/i18n';

import { bridgeRoutesConfig } from 'modules/bridge';
import { Locale } from 'modules/i18n';
import { swapRoutesConfig } from 'modules/swap';
import { vaultRoutesConfig } from 'modules/vault';
import { useMemo } from 'react';

const SWAP_EXTERNAL_LINK =
  'https://app.uniswap.org/swap?outputCurrency=0x8236a87084f8b84306f72007f36f2618a5634494';

export const translation = {
  [Locale.en]: {
    dashboard: 'Dashboard',
    docs: 'Docs',
    faq: 'FAQ',
    swap: 'Swap',
    defi: 'DeFi',
    bridge: 'Bridge',
    vault: 'Vault',
  },
};

type INavItem = {
  title: string;
  link: string;
  isExternal?: boolean;
} | null;

export const useNavigationItems = (): INavItem[] => {
  const { keys, t } = useTranslation(translation);

  return useMemo<INavItem[]>(
    () => [
      {
        title: t(keys.dashboard),
        link: dashboardRouteConfig.main.generatePath(),
      },
      ...(featureConfig.isSwapActive
        ? [
            {
              title: t(keys.swap),
              link: swapRoutesConfig.main.generatePath(),
            },
          ]
        : [
            {
              title: t(keys.swap),
              link: SWAP_EXTERNAL_LINK,
              isExternal: true,
            },
          ]),
      ...(featureConfig.isDefiAvailable
        ? [
            {
              title: t(keys.defi),
              link: defiRoutesConfig.main.generatePath(),
            },
          ]
        : []),
      ...(featureConfig.isBridgeAvailable
        ? [
            {
              title: t(keys.bridge),
              link: bridgeRoutesConfig.main.generatePath(),
            },
          ]
        : []),
      ...(featureConfig.isVaultPageEnabled
        ? [
            {
              title: t(keys.vault),
              link: vaultRoutesConfig.main.generatePath(),
            },
          ]
        : []),
      {
        title: t(keys.docs),
        link: 'https://docs.lombard.finance',
        isExternal: true,
      },
      {
        title: t(keys.faq),
        link: 'https://docs.lombard.finance/faq/lombard-faq',
        isExternal: true,
      },
    ],
    [keys, t],
  );
};
