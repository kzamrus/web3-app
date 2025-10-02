import { ONativeToken } from 'modules/api';
import { SummaryItem } from 'modules/common/components/Summary';
import { DECIMAL_PLACES_BTC } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { calcReceiveAmount } from 'modules/unstake/utils/calcReceiveAmount';
import { translation } from './translation';

const RATIO_TEXT = '1 BTC = 1 LBTC';

interface SummaryReceiveProps {
  amount: string;
}

export function SummaryReceive({ amount }: SummaryReceiveProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const receiveAmount = calcReceiveAmount(amount);

  const btcAmountText = t('unit.tokenValue', {
    token: ONativeToken.BTC,
    value: receiveAmount.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
  });

  return (
    <SummaryItem
      label={t(keys.youWillGet)}
      value={btcAmountText}
      valueTitle={receiveAmount.toFormat()}
      valueSubtitle={RATIO_TEXT}
    />
  );
}
