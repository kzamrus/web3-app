import { JSX, lazy, Suspense } from 'react';
import { createSearchParams, Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { ROOT_PATH } from 'modules/common/const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const ROOT = `${ROOT_PATH}claim/`;

export const claimDepositsRouteConfig = createRouteConfig(
  {
    claim: {
      path: ROOT,
      generatePath: (txHash?: string) => {
        if (!txHash) {
          return ROOT;
        }

        const searchParams = createSearchParams({ txHash });
        return `${ROOT}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
        };
      },
    },
  },
  ROOT,
);

const ClaimDeposit = lazy(() =>
  import('./screens/ClaimDeposit').then(({ ClaimDeposit }) => ({
    default: ClaimDeposit,
  })),
);

export function getClaimDepositsRoutes(): JSX.Element {
  return (
    <Route
      element={
        <Suspense fallback={<QueryLoading isAbsolute />}>
          <ClaimDeposit />
        </Suspense>
      }
      path={claimDepositsRouteConfig.root}
    />
  );
}
