import { useBoringVaultV1 } from 'boring-vault-ui';
import { WithdrawQueueStatus } from 'boring-vault-ui/types';
import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { showNotification } from 'modules/notifications';
import { useVaultProvider } from 'modules/vault/hooks/useVaultProvider';
import { useEffect, useState } from 'react';

export function useTokenOut() {
  const [isLoading, setLoading] = useState(false);
  const { withdrawQueueStatuses } = useBoringVaultV1();
  const [statuses, setStatuses] = useState<any>(null);
  const provider = useVaultProvider();

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!provider) return;
      setLoading(true);
      try {
        const signer = await provider.getSigner();
        const fetchedStatuses: WithdrawQueueStatus[] =
          await withdrawQueueStatuses(signer!);

        setLoading(false);
        setStatuses(fetchedStatuses);
      } catch (err) {
        showNotification({
          message: getErrorMessage(err),
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, [withdrawQueueStatuses, provider]);

  return { data: statuses?.[0], isLoading };
}
