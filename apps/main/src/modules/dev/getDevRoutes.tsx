import { JSX, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { ROOT_PATH } from 'modules/common/const';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const ROOT = `${ROOT_PATH}dev/`;

export const devRouteConfig = createRouteConfig(
  {
    dev: {
      path: ROOT,
      generatePath: () => ROOT,
    },
  },
  ROOT,
);

const DevPage = lazy(() =>
  import('./screens/DevPage').then(({ DevPage }) => ({
    default: DevPage,
  })),
);

export function getDevRoutes(): JSX.Element {
  return (
    <Route
      element={
        <Suspense fallback={<QueryLoading />}>
          <DevPage />
        </Suspense>
      }
      path={devRouteConfig.root}
    />
  );
}
