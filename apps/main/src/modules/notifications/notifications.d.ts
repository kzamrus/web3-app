import { SharedProps as DefaulSharedProps } from 'notistack';

declare module 'notistack' {
  interface SharedProps extends DefaulSharedProps {
    /**
     * Extra property to show header in notification.
     * @default undefined
     */
    header?: string;
  }
}
