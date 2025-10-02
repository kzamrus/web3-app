import { CURRENT_ENV } from 'modules/common/const';

interface IApiConfig {
  baseApiUrl: string;
  thresholdKey: string;
  _1inchApiUrl: string;
}

const stageConfig: IApiConfig = {
  baseApiUrl: 'https://staging.prod.lombard.finance',
  thresholdKey: 'd6594eb1-5740-4c2f-bcde-76bb15d85649',
  _1inchApiUrl: 'https://bff.stage.lombard.finance/oneinch-api/proxy',
};

const testnetConfig: IApiConfig = {
  ...stageConfig,
  baseApiUrl: 'https://gastald-testnet.prod.lombard.finance',
};

const prodConfig: IApiConfig = {
  baseApiUrl: 'https://mainnet.prod.lombard.finance',
  thresholdKey: '9a1d5a9a-b5d0-4059-9012-0d77dfd32a95',
  _1inchApiUrl: 'https://bff.stage.lombard.finance/oneinch-api/proxy',
};

export const getApiConfig = (env = CURRENT_ENV): IApiConfig => {
  switch (env) {
    case 'prod':
      return prodConfig;
    case 'testnet':
      return testnetConfig;
    default:
      return stageConfig;
  }
};
