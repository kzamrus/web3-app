import { format, parse } from 'date-fns';

export const getSum = (usdPrice: string, assetsQuantity: string) =>
  Number(usdPrice) * Number(assetsQuantity);

export const getDate = (timestamp: string) => {
  const date = parse(timestamp, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
  return format(date, 'd MMMM');
};
