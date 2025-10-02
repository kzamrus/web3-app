import { TFeatureKey, featureConfig } from 'modules/common/featureConfig';
import { fromCamelCase } from './fromCamelCase';

interface IFeatureDescription {
  key: TFeatureKey;
  label: string;
  description?: string;
}

const definedInfo: IFeatureDescription[] = [
  {
    key: 'isDevUiEnabled',
    label: 'Dev UI',
    description:
      'If enabled, test menu and dev route will be available. Disabled in production',
  },
  {
    key: 'offlineTesting',
    label: 'Offline testing mode',
    description:
      'If enabled, the app will use the offline data for testing purposes',
  },
  {
    key: 'isWalletWithSanctions',
    label: 'Wallet with sanctions',
    description:
      'Offline testing only. If enabled, the app will show the sanctions message on the deposit address page',
  },
];

const featureKeys = Object.keys(featureConfig) as TFeatureKey[];

const notDefinedKeys = featureKeys.filter(
  key => !definedInfo.some(info => info.key === key),
);

const defaultFeaturesInfo = notDefinedKeys.map<IFeatureDescription>(key => ({
  key,
  label: fromCamelCase(key),
}));

export const featuresInfo = [...definedInfo, ...defaultFeaturesInfo];
