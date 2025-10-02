import { QueryLoading } from 'modules/common/components/QueryLoading';
import { featureConfig } from 'modules/common/featureConfig';
import { ReactNode } from 'react';
import { GeoBlocking } from './components/GeoBlocking';
import { useGetAccessInfoQuery } from '../../../common/actions/getAccessInfo.ts';

interface IGeoBlockingGuardProps {
  children?: ReactNode;
}

export function GeoBlockingGuard({
  children,
}: IGeoBlockingGuardProps): JSX.Element {
  const { data, isLoading } = useGetAccessInfoQuery();

  if (featureConfig.geoBlocking) {
    if (isLoading) {
      return <QueryLoading isAbsolute />;
    }

    if (!data?.isAccessAllowed) {
      return <GeoBlocking />;
    }
  }

  return <>{children}</>;
}
