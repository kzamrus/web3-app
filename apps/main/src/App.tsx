import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from 'Routes';
import { BrowserRouter } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { useInitializeLocale } from 'modules/i18n';

import { RestoreConnection } from 'modules/auth';
import { CheckClosedBanners } from 'modules/banners';
import { EarlyAccessGuard } from 'modules/early-access';
import { CustomizedSnackbarProvider } from 'modules/notifications';
import { mainTheme } from 'modules/themes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import packageJson from '../package.json';

export function App(): JSX.Element {
  const { isInitialized } = useInitializeLocale();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={packageJson.homepage}>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />

            <CustomizedSnackbarProvider />

            <CheckClosedBanners />

            {isInitialized ? (
              <EarlyAccessGuard>
                <RestoreConnection />

                <AppRoutes />
              </EarlyAccessGuard>
            ) : (
              <QueryLoading isAbsolute />
            )}
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
