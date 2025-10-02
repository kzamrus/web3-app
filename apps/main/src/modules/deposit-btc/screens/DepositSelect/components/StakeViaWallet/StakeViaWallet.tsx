import { featureConfig } from 'modules/common/featureConfig';
import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';
import { useTranslation } from 'modules/i18n';
import {
  StakeButtonBitget,
  StakeButtonOkx,
  StakeButtonTomo,
  StakeButtonXverse,
} from '../StakeButton';
import { StakeMethodBox } from '../StakeMethodBox';
import { translation } from './translation';
import { useStakeViaWalletStyles } from './useStakeViaWalletStyles';

interface IStakeViaWalletProps {
  isDisabled?: boolean;
}

export function StakeViaWallet({
  isDisabled,
}: IStakeViaWalletProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useStakeViaWalletStyles();
  const isMobile = useDetectMobile();

  return (
    <StakeMethodBox title={t(keys.title)}>
      {isMobile ? (
        <div className={classes.notSupported}>{t(keys.notSupported)}</div>
      ) : (
        <div className={classes.wallets}>
          <StakeButtonOkx isDisabled={isDisabled} />

          <StakeButtonXverse isDisabled={isDisabled} />

          {featureConfig.isBtcTomoWalletActive && (
            <StakeButtonTomo isDisabled={isDisabled} />
          )}

          <StakeButtonBitget isDisabled={isDisabled} />
        </div>
      )}
    </StakeMethodBox>
  );
}
