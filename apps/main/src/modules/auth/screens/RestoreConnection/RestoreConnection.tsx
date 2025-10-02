import { ReactNode } from 'react';
import { useRestoreConnection } from './useRestoreConnection';

interface IRestoreConnectionProps {
  children?: ReactNode;
}
export function RestoreConnection({
  children,
}: IRestoreConnectionProps): JSX.Element {
  useRestoreConnection();

  return <>{children}</>;
}
