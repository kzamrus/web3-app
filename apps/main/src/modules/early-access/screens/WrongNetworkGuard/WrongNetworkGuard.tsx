import { ReactNode } from 'react';
import { WrongNetwork } from './components/WrongNetwork';
import { useWrongNetwork } from './components/WrongNetwork/useWrongNetwork';

interface IGeoBlockingGuardProps {
  children?: ReactNode;
}

export function WrongNetworkGuard({
  children,
}: IGeoBlockingGuardProps): JSX.Element {
  const isWrongNetwork = useWrongNetwork();

  if (isWrongNetwork) {
    return <WrongNetwork />;
  }

  return <>{children}</>;
}
