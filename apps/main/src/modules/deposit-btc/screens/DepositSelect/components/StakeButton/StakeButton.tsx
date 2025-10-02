import { Button, ButtonProps, Tooltip } from '@mui/material';
import { TBtcWalletId } from 'modules/api';
import { WalletIcon } from 'modules/auth';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useStakeButtonStyles } from './useStakeButtonStyles';

export interface IStakeButtonProps
  extends Omit<ButtonProps, 'children' | 'href' | 'disabled'> {
  tooltip?: string;
  walletId: TBtcWalletId;
  withInstallLabel?: boolean;
  link?: string;
  isDisabled?: boolean;
}

export function StakeButton({
  tooltip,
  link,
  walletId,
  isDisabled,
  withInstallLabel,
  onClick,
  ...restProps
}: IStakeButtonProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes, cx } = useStakeButtonStyles();

  const wallet = t(keys.wallet[walletId]);

  const getTooltip = () => {
    if (withInstallLabel) {
      return t(keys.install, { wallet });
    }
    if (tooltip) {
      return tooltip;
    }
    return wallet;
  };

  const props = link
    ? {
        component: 'a',
        href: link,
        target: '_blank',
        rel: 'noreferrer',
      }
    : {
        component: 'button',
        onClick,
        type: 'submit',
      };

  const btnProps = { ...restProps, ...props } as IStakeButtonProps;

  return (
    <Tooltip title={getTooltip()}>
      <span>
        <Button
          {...btnProps}
          disabled={isDisabled}
          className={classes.button}
          variant="outlined"
        >
          <WalletIcon
            className={cx(classes.icon, isDisabled && classes.iconDisabled)}
            wallet={walletId}
          />
        </Button>
      </span>
    </Tooltip>
  );
}
