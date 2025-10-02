import { ConnectionModal } from 'modules/auth';
import { BtcConnectionModal } from 'modules/auth/screens/BtcConnectionModal';
import { featureConfig } from 'modules/common/featureConfig';
import { LazyTestLink } from 'modules/dev';
import { ILayoutProps, Layout } from 'modules/layout/components/Layout';
import { AppBanner } from './components/AppBanner';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function DefaultLayout({
  children,
}: Pick<ILayoutProps, 'children'>): JSX.Element {
  return (
    <Layout
      headerSlot={
        <>
          <AppBanner />

          <Header />
        </>
      }
      footerSlot={
        <>
          <Footer />

          {featureConfig.isDevUiEnabled && <LazyTestLink />}
        </>
      }
    >
      {children}

      <ConnectionModal />

      <BtcConnectionModal />
    </Layout>
  );
}
