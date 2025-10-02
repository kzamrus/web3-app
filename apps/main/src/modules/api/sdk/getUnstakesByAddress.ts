import axios from 'axios';
import { address as addressUtils, networks } from 'bitcoinjs-lib';
import { IS_PROD } from 'modules/common/const';
import { Address } from 'modules/common/types';
import { getApiConfig } from '../apiConfig';
import { OChainId, TChainId } from '../chainIDs';
import { fromSatoshi } from '../utils/convertSatoshi';
import { TChainName } from './types';
import { getCainIdByName } from './utils/getCainIdByName';

const { baseApiUrl } = getApiConfig();

interface IUnstakeResponse {
  tx_hash: string;
  blockchain: TChainName;
  block_height: string;
  block_time: string;
  from_address: string;
  output_script: string;
  amount: string;
  payout_txid?: string;
  payout_index?: string;
  sanctioned?: boolean;
}

interface IGetUnstakesResponse {
  unstakes?: IUnstakeResponse[];
}

export interface IUnstake {
  txHash: string;
  chainId: TChainId;
  blockHeight: number;
  date: Date;
  fromAddress: Address;
  btcAddress: string;
  amount: number;
  payoutTxid?: string;
  payoutIndex?: number;
  sanctioned?: boolean;
}

/**
 * Get unstakes by address
 *
 * @param address the address
 *
 * @returns the unstakes
 */
export async function getUnstakesByAddress(
  address: Address,
): Promise<IUnstake[]> {
  const url = `${baseApiUrl}/api/v1/address/unstakes/${address}`;

  const {
    data: { unstakes = [] },
  } = await axios.get<IGetUnstakesResponse>(url);

  return unstakes.map(mapResponse);
}

function mapResponse(data: IUnstakeResponse): IUnstake {
  const btcAddress = addressUtils.fromOutputScript(
    Buffer.from(data.output_script, 'hex'),
    IS_PROD ? networks.bitcoin : networks.testnet,
  );

  return {
    txHash: data.tx_hash,
    chainId: getCainIdByName(data.blockchain),
    blockHeight: +data.block_height,
    date: new Date(+data.block_time * 1000),
    fromAddress: data.from_address,
    btcAddress,
    amount: fromSatoshi(data.amount),
    payoutTxid: data.payout_txid,
    payoutIndex: data.payout_index ? +data.payout_index : undefined,
    sanctioned: data.sanctioned,
  };
}

export const demoUnstakesByAddress: IUnstake[] = [
  {
    txHash:
      '0x27d7498d9ddd53bee9ad30cbe69ed24e20afd27d3b9e43c9b271e1354c1bc628',
    chainId: OChainId.holesky,
    blockHeight: 1772965,
    date: new Date(1718875536000),
    fromAddress: '0x402fdb1a672166ac3e40ce6b491869e8fe408e34',
    btcAddress:
      '512034db9c279ccefb1e1e521b5aaa84b4a8ef60a843cbf8da6ff3ea89c1a845385f',
    amount: 0.00023,
  },
  {
    txHash:
      '0x9048701472b82e6bc36b6890fb4d26d48c6dacad4a9b2c7fb538bc45e875bfd6',
    chainId: OChainId.holesky,
    blockHeight: 1772965,
    date: new Date(1718875536000),
    fromAddress: '0x402fdb1a672166ac3e40ce6b491869e8fe408e34',
    btcAddress:
      '512034db9c279ccefb1e1e521b5aaa84b4a8ef60a843cbf8da6ff3ea89c1a845385f',
    amount: 0.2,
    payoutTxid:
      'tb1peyg7dm4wjudh8thmdgc6327u7fhx9yalgugp06r0mzxe283x5emqsc8yek',
  },
];
