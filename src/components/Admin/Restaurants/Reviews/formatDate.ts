import { format, fromUnixTime } from 'date-fns';

export const formatDate = (unixDate: number): string => {
  const date = fromUnixTime(unixDate);
  return format(date, 'MM-dd-YYY h:mm b')
}
