import { db } from "../db";
import { cache } from "react";
import { NominationWithNominee } from "@/types";

const isNominationWithNominee = (nomination: unknown): nomination is NominationWithNominee => {
  return nomination !== null && (nomination as NominationWithNominee)?.nominee?.id !== null;
};

export const getNomineesInCategory = cache(
  async (categoryId: string): Promise<NominationWithNominee[]> => {
    const data = await db.query.nominations.findMany({
      where: { categoryId: categoryId },
      with: { nominee: true },
    });

    const dataWithValues = data
      .filter(isNominationWithNominee)
      .map((nomination) => ({
        ...nomination,
        nominationId: nomination.id,
        tmdbId: nomination.nominee?.tmdbId ?? null,
      }));

    return dataWithValues ?? [];
  }
);
