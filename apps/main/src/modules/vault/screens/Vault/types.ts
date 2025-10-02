export type SevenSeasResponse = {
  Response: SevenSeasData[];
};

export type SevenSeasData = {
  block_number: number;
  daily_apy: number;
  price_usd: string;
  share_price: number;
  timestamp: string;
  total_assets: string;
  tvl: string;
  unix_seconds: string;
  vault_address: string;
};

export interface ITransactionRequest {
  amount: number;
  blockNumber: number;
  deadline: number;
  errorCode: number;
  minPrice: number;
  offerToken: string;
  timestamp: number;
  transactionHash: string;
  user: string;
  wantToken: string;
}
