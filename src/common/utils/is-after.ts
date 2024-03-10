import { CEREMONY_START, ESTIMATED_CEREMONY_END } from "../constants";
import { isDateAfterAnother } from "./is-date-after-another";

const convertDateToUTC = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const isAfterCeremony = (): boolean => {
  const nowInUTC = convertDateToUTC(new Date());

  return isDateAfterAnother(nowInUTC, ESTIMATED_CEREMONY_END);
};

export const isAfterCeremonyStart = (): boolean => {
  const nowInUTC = convertDateToUTC(new Date());

  return isDateAfterAnother(nowInUTC, CEREMONY_START);
};
