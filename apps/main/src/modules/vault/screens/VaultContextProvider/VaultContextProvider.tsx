import { BoringVaultV1Provider } from 'boring-vault-ui';
import { QueryLoading } from 'modules/common/components/QueryLoading';
import { VAULT_CONTRACT } from 'modules/vault/const';
import { ReactNode } from 'react';
import { useVaultProvider } from '../../hooks/useVaultProvider';

interface IVaultContextProviderProps {
  children: ReactNode;
}

export function VaultContextProvider({
  children,
}: IVaultContextProviderProps): JSX.Element {
  const provider = useVaultProvider();

  return provider ? (
    <BoringVaultV1Provider
      ethersProvider={provider}
      // TODO: what if we want to use a different chain?
      chain="ethereum"
      vaultContract={VAULT_CONTRACT}
      tellerContract="0x2eA43384F1A98765257bc6Cb26c7131dEbdEB9B3"
      accountantContract="0x28634D0c5edC67CF2450E74deA49B90a4FF93dCE"
      lensContract="0x5232bc0F5999f8dA604c42E1748A13a170F94A1B"
      withdrawQueueContract="0x3b4aCd8879fb60586cCd74bC2F831A4C5E7DbBf8"
      depositTokens={[
        {
          displayName: 'wBTC',
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          decimals: 8,
        },
        {
          displayName: 'LBTC',
          address: '0x8236a87084f8B84306f72007F36F2618A5634494',
          decimals: 8,
        },
      ]}
      withdrawTokens={[
        {
          displayName: 'LBTC',
          address: '0x8236a87084f8B84306f72007F36F2618A5634494',
          decimals: 8,
        },
      ]}
      baseAsset={{
        displayName: 'wBTC',
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        decimals: 8,
      }}
      vaultDecimals={8}
    >
      {children}
    </BoringVaultV1Provider>
  ) : (
    <QueryLoading isAbsolute />
  );
}
