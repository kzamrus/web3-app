import { VaultContextProvider } from '../VaultContextProvider';
import { WithdrawCancel as WithdrawCancelComponent } from './WithdrawCancel';

export function WithdrawCancel() {
  return (
    <VaultContextProvider>
      <WithdrawCancelComponent />
    </VaultContextProvider>
  );
}
