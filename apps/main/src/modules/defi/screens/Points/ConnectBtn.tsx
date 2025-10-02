import { useConnection, useWalletConnectModal } from 'modules/auth';
import { Button, IButtonProps } from 'modules/common/components/Button';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';

type SubmitBtnProps = Pick<IButtonProps, 'disabled' | 'isLoading'>;

export function ConnectBtn({
  disabled,
  isLoading,
}: SubmitBtnProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();
  const { onOpen } = useWalletConnectModal();

  return (
    <>
      {isConnected ? (
        ''
      ) : (
        <Button
          fullWidth
          variant="contained"
          size="large"
          type={isConnected ? 'submit' : 'button'}
          onClick={isConnected ? undefined : onOpen}
          disabled={disabled || isLoading}
          isLoading={isLoading}
        >
          {t(keys.connectWallet)}
        </Button>
      )}
    </>
  );
}
