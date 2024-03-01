import { isDateAfterAnother } from "./isDateAfterAnother";

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
  const estimatedCeremonyEnd = new Date(2024, 2, 11, 4, 0);
  const nowInUTC = convertDateToUTC(new Date());

  return isDateAfterAnother(nowInUTC, estimatedCeremonyEnd);
};
