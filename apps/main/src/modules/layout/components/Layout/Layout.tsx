import { ReactNode } from 'react';

import { useLayoutStyles } from './useLayoutStyles';

export interface ILayoutProps {
  children?: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  className?: string;
}

export function Layout({
  children,
  headerSlot,
  footerSlot,
  className,
}: ILayoutProps): JSX.Element {
  const { classes, cx } = useLayoutStyles();

  return (
    <div className={cx(classes.root, className)}>
      {headerSlot}

      <main className={classes.main}>{children}</main>

      {footerSlot}
    </div>
  );
}
