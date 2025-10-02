import { QueryLoading } from 'modules/common/components/QueryLoading';
import { Suspense, lazy } from 'react';

const TestLink = lazy(() =>
  import('./TestLink').then(({ TestLink }) => ({
    default: TestLink,
  })),
);

export function LazyTestLink(): JSX.Element {
  return (
    <Suspense fallback={<QueryLoading isAbsolute />}>
      <TestLink />
    </Suspense>
  );
}
