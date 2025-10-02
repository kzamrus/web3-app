import { TChainId } from '../chainIDs';
import { getReadProvider } from '../web3Provider';
import { TransactionReceiptAPI } from 'web3-types';

type Args = {
  eventIndex: number;
  abi: any;
  eventName: string;
  chainId: TChainId;
  logs: TransactionReceiptAPI['logs'];
};

export async function decodeLog({
  chainId,
  logs,
  eventIndex,
  abi,
  eventName,
}: Args) {
  try {
    const provider = await getReadProvider(chainId);
    const web3 = provider.getWeb3();
    const log = logs[eventIndex];

    const inputs =
      abi.find((def: any) => def.name === eventName && def.type === 'event')
        ?.inputs ?? [];

    if (!log.data) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("`data` isn't defined");
    }

    if (!log.topics) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("`topics` isn't defined");
    }

    return web3.eth.abi.decodeLog(inputs, log.data, log.topics);
  } catch (error) {
    console.error(error);
  }
}
