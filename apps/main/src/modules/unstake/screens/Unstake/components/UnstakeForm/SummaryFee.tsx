import { ONativeToken } from 'modules/api';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { SummaryItem } from 'modules/common/components/Summary';
import {
  ACTION_CACHE_LONG,
  SECURITY_FEE,
  USD_DECIMAL_PLACES,
} from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';

const defaultBtcPrice = 0;

export function SummaryFee(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const { data: btcPrice = defaultBtcPrice, isLoading: isBtcPriceLoading } =
    useGetBtcPriceQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
    });

  const feeUsd = SECURITY_FEE.multipliedBy(btcPrice);

  return (
    <SummaryItem
      label={t(keys.securityFee)}
      labelSubtitle={t(keys.securityFeeInfo)}
      value={t(keys.feeValue, {
        usdValue: feeUsd.decimalPlaces(USD_DECIMAL_PLACES).toFormat(),
      })}
      valueSubtitle={t('unit.tokenValue', {
        token: ONativeToken.BTC,
        value: SECURITY_FEE.toFormat(),
      })}
      labelTooltip={t(keys.securityFeeTooltip)}
      isLoading={isBtcPriceLoading}
    />
  );
}
