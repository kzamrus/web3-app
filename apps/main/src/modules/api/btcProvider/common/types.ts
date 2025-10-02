export type TBitcoin = number;
export type TSatoshi = number;

export interface IUtxo {
  txid: string;
  vout: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
  value: TSatoshi;
}

export type SuccessJSONRPCResponse<T = unknown> = {
  jsonrpc: string;
  id: number;
  result: T;
};

export type ErrorJSONRPCResponse = {
  jsonrpc: string;
  id: number;
  error: {
    code: number;
    message: string;
  };
};
