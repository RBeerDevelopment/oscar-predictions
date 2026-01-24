import { db } from "@/db/db";
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

export const isAfterCeremony = async (): Promise<boolean> => {
  const nowInUTC = convertDateToUTC(new Date());

  const ceremonyEnd = await db.query.academyAwards.findFirst({
    orderBy: {
      ceremonyYear: "desc"
    }
  }).then(award => award?.ceremonyDate);

  if (!ceremonyEnd) return false;
  return isDateAfterAnother(nowInUTC, new Date(ceremonyEnd));
};

export const isAfterCeremonyStart = (): boolean => {
  const nowInUTC = convertDateToUTC(new Date());

  return isDateAfterAnother(nowInUTC, CEREMONY_START);
};
