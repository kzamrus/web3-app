import {
  TxStatus,
  TxStatusDesctiption,
  TxStatusTitle,
} from 'modules/common/components/TxStatus';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';
import { useClaimQueryParams } from '../../hooks/useClaimQueryParams';
import { BackButton } from '../BackButton';

const dashboardPath = dashboardRouteConfig.main.generatePath();

export function WrongNetworkParam(): JSX.Element {
  const { txHash, isValidTxHash } = useClaimQueryParams();

  return (
    <TxStatus closeLink={dashboardPath}>
      <TxStatusTitle isError />

      <TxStatusDesctiption
        isError
        hasTxHash={!!txHash}
        isValidTxHash={isValidTxHash}
      />

      <BackButton />
    </TxStatus>
  );
}
