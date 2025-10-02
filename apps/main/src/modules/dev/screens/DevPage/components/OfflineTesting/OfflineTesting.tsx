import {
  Box,
  CheckboxProps,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { Checkbox } from 'modules/common/components/Checkbox';
import { InfoIconWithTooltip } from 'modules/common/components/InfoIconWithTooltip';
import { Quote } from 'modules/common/components/Quote';
import { IS_LOCAL } from 'modules/common/const';
import {
  TFeatureKey,
  featureConfig,
  setFeatureState,
} from 'modules/common/featureConfig';
import { useState } from 'react';
import { featuresInfo } from './featuresInfo';

const featureKeys = Object.keys(featureConfig) as TFeatureKey[];

export function OfflineTesting(): JSX.Element {
  const [localFeatureConfig, setLocalFeatureConfig] = useState(featureConfig);

  const handleCheckboxChange: CheckboxProps['onChange'] = (event, checked) => {
    const { name } = event.target;
    setFeatureState(name as TFeatureKey, checked);
    setLocalFeatureConfig(state => ({ ...state, [name]: checked }));
  };

  const shouldRefresh = featureKeys.some(
    key => featureConfig[key] !== localFeatureConfig[key],
  );

  const refreshIndicatorEl = <span title="Refresh required">🔃</span>;

  return (
    <Paper>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Features config
      </Typography>

      <Typography>
        This config is available only for the stage and local environments. In
        production, the app uses the default config.
      </Typography>

      <Quote sx={{ my: 1 }}>
        If you want to reset to the default config, please open app in the new
        window.
      </Quote>

      <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
        {featuresInfo.map(({ key, label, description }) => {
          const checkedLocaly = localFeatureConfig[key];
          const changesNotSaved = featureConfig[key] !== checkedLocaly;

          return (
            <FormControlLabel
              key={key}
              label={
                <>
                  {label}

                  {description && (
                    <InfoIconWithTooltip>{description}</InfoIconWithTooltip>
                  )}

                  {changesNotSaved && refreshIndicatorEl}
                </>
              }
              control={
                <Checkbox
                  name={key}
                  checked={checkedLocaly}
                  onChange={handleCheckboxChange}
                />
              }
            />
          );
        })}
      </Box>

      {shouldRefresh && (
        <Typography sx={{ mt: 2 }}>
          {refreshIndicatorEl}

          {IS_LOCAL
            ? 'Please refresh the page'
            : 'Please refresh the page on the dashboard route to apply changes'}
        </Typography>
      )}
    </Paper>
  );
}
