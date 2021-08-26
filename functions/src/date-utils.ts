import { getUnixTime } from "date-fns";

export const getUnixTimestamp = (): number => getUnixTime(new Date());
