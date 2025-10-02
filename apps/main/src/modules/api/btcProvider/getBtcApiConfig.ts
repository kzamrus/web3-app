import { IS_PROD } from 'modules/common/const';
import { TNetworkMode } from './types';

interface IApiConfig {
  mempoolApiUrl: string;
}

const stageConfig: IApiConfig = {
  mempoolApiUrl: 'https://mempool.space/signet',
};

const prodConfig: IApiConfig = {
  mempoolApiUrl: 'https://mempool.space',
};

const defaultMode = IS_PROD ? 'mainnet' : 'testnet';

/**
 * Returns the configuration for the Bitcoin related APIs.
 *
 * @param mode - The network mode.
 *
 * @returns The configuration.
 */
export const getBtcApiConfig = (
  mode: TNetworkMode = defaultMode,
): IApiConfig => (mode === 'mainnet' ? prodConfig : stageConfig);
