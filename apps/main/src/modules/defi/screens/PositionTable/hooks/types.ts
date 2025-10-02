import { ITableRowProps } from '../TableRow';

export interface IUseProtocolRow extends Omit<ITableRowProps, 'isConnected'> {
  isLoading: boolean;
}
