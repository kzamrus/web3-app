import { Container } from '@mui/material';
import { useConnection } from 'modules/auth';
import { QueryLoading } from 'modules/common/components/QueryLoading';
import { Section } from 'modules/common/components/Section';
import { featureConfig } from 'modules/common/featureConfig';
import {
  REGISTER_WALLET_CACHE_KEY,
  useRegisterWalletMutation,
} from 'modules/early-access/actions/registerWallet';
import { useAccessInfo } from 'modules/early-access/hooks/useAccessInfo';
import { WrongWallet } from './components/WrongWallet';

interface IWalletGuardProps {
  children?: React.ReactNode;
}

/**
 * The component that prevents connecting to the wrong wallet relies
 * on access information. Users will see the incorrect wallet screen
 * if they connect to the incorrect wallet.
 */
export function WalletGuard({ children }: IWalletGuardProps): JSX.Element {
  const { isConnected, address } = useConnection();
  const { data, isLoading: isAccessInfoLoading } = useAccessInfo();

  const [, { isLoading: isRegistrationLoading }] = useRegisterWalletMutation({
    fixedCacheKey: REGISTER_WALLET_CACHE_KEY,
  });

  const isLoading = isAccessInfoLoading || isRegistrationLoading;
  const accessWallet = data?.wallet;

  const isWrongWallet =
    isConnected &&
    data &&
    address &&
    accessWallet?.toLowerCase() !== address.toLowerCase();

  if (featureConfig.accessGuard && isWrongWallet) {
    return (
      <Section centered>
        <Container maxWidth="sm">
          {isLoading ? <QueryLoading isAbsolute /> : <WrongWallet />}
        </Container>
      </Section>
    );
  }

  return <>{children}</>;
}
