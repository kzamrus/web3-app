import { featureConfig } from 'modules/common/featureConfig';
import { LazyTestLink } from 'modules/dev';
import { ILayoutProps, Layout } from 'modules/layout';
import { SimpleHeader } from './components/SimpleHeader';

interface ISimpleLayoutProps extends Pick<ILayoutProps, 'children'> {
  showHeader?: boolean;
}

export function SimpleLayout({
  showHeader = true,
  ...props
}: ISimpleLayoutProps): JSX.Element {
  return (
    <Layout
      {...props}
      headerSlot={showHeader && <SimpleHeader />}
      footerSlot={featureConfig.isDevUiEnabled && <LazyTestLink />}
    />
  );
}
