import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Current allocations',
    label: 'Pendle',
    head1: 'Position',
    head2: 'Allocation',
    head3: '30 day trailing APY',
    text: `Pendle is a fixed yield strategy. 
    Liquid allocates a portion of the vaults funds to the PT-weETH token and Pendle-LPT token. The cheaper PT component is at the time, the higher the fixed yield. As the vault rebalances assets, it may deploy more weETH into the Pendle strategy. The fixed rate will fluctuate up and down as people buy and sell PT in market. Although this may dip the vault APY and potentially incur short-term volatility, both capital and return are guaranteed when held until maturity. While the fixed yield is achieved at maturity, the Liquid vault buys and sells its Pendle PT / LPT positions at any time to optimize returns, and will move out of these positions at maturity date automatically`,
    label1: 'Pendle',
    label2: 'Curve',
    label3: 'Uniswap V3',
    label4: 'Gearbox',
    label5: 'Morpho',
    tbd: 'TBD',
  },
};
