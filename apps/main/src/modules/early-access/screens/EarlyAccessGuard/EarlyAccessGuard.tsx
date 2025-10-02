import { QueryLoading } from 'modules/common/components/QueryLoading';
import { featureConfig } from 'modules/common/featureConfig';
import { devRouteConfig } from 'modules/dev';
import { useAccessInfo } from 'modules/early-access/hooks/useAccessInfo';
import { getAccessCode } from 'modules/early-access/utils/storeAccessCode';
import { ReactNode } from 'react';
import { useMatch } from 'react-router-dom';
import { SimpleLayout } from '../SimpleLayout/SimpleLayout';
import { SuccessfulRegistration } from '../SuccessfulRegistration';
import { EarlyAccess } from './components/EarlyAccess';

interface IEarlyAccessGuardProps {
  children?: ReactNode;
}

export function EarlyAccessGuard({
  children,
}: IEarlyAccessGuardProps): JSX.Element {
  const devPathMatch = useMatch(devRouteConfig.dev.path);
  const { data, isLoading } = useAccessInfo();

  if (featureConfig.accessGuard && !devPathMatch && !data) {
    const storedAccessCode = getAccessCode();

    return (
      <SimpleLayout>
        {storedAccessCode && isLoading ? (
          <QueryLoading isAbsolute />
        ) : (
          <EarlyAccess />
        )}
      </SimpleLayout>
    );
  }

  return (
    <>
      {children}

      <SuccessfulRegistration />
    </>
  );
}
