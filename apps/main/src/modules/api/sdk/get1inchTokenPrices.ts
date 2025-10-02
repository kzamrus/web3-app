import axios from 'axios';
import { TChainId } from '../chainIDs';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export type TokenPrices = Record<string, string>;

export type TokenUsdBalances = Record<
  string,
  { balance: string; price: string; usd: string }
>;

const ETH_1INCH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const PriceBase = 1000000000000000000;
export const get1inchTokenPrices = async (
  chain: TChainId,
  address?: string,
): Promise<TokenUsdBalances> => {
  if (!address) {
    return {};
  }

  const url1 = `https://token-prices.1inch.io/v1.1/${chain}/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee?currency=usd`;
  const url2 = `https://token-prices.1inch.io/v1.1/${chain}`;
  const url = `${_1inchApiUrl}/balance/v1.2/${chain}/balances/${address}`;

  try {
    const [res1, res2] = await Promise.all([
      axios.get<TokenPrices>(url1),
      axios.get<TokenPrices>(url2),
    ]);
    const { data } = res1;
    const { data: tokenPrices } = res2;

    const ethPrice = data[ETH_1INCH];
    const prices = {} as TokenPrices;
    for (const token in tokenPrices) {
      prices[token] = String(
        (Number(tokenPrices[token]) / PriceBase) * Number(ethPrice),
      );
    }

    let balanceRes = {} as Record<string, string>;

    try {
      const { data } = await axios.get<Record<string, string>>(url);

      balanceRes = data;
    } catch (e) {
      console.error(e);
      throw new Error('Failed to fetch balance from 1inch');
    }

    const result = {} as TokenUsdBalances;
    for (const token in balanceRes) {
      const balance = balanceRes[token];
      const price = prices[token];
      const usd = price;
      result[token] = {
        balance,
        price,
        usd,
      };
    }
    result[ETH_1INCH] = {
      balance: balanceRes[ETH_1INCH],
      price: ethPrice,
      usd: ethPrice,
    };
    return result;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch balance from 1inch');
  }
};
