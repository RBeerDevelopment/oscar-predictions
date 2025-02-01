import { Nominee } from "@/common/types/nominee";
import { db } from "../db";
import { cache } from "react";
import { EntityType } from "@/common/types/entity-type";

export const getNomineesInCategory = cache(
  async (categoryId: number): Promise<Nominee[]> => {
    const data = await db.query.nominations.findMany({
      where: (nominations, { eq }) => eq(nominations.categoryId, categoryId),
      with: { nominee: true, category: true },
    });

    const dataWithValues = data.filter(
      (entry) =>
        entry.nominee.name !== null &&
        entry.category.type !== null &&
        entry.nominee.tmdbId !== null
    );

    return dataWithValues.map((entry) => ({
      nominationId: entry.id,
      name: entry.nominee.name ?? "",
      description: entry.description ?? "",
      type: (entry.category.type ?? "movie") as EntityType,
      tmdbPosterPath: entry.nominee.tmdbPosterPath,
      posterBlurhash: entry.nominee.tmdbPosterBlurhash,
      tmdbId: entry.nominee.tmdbId ?? "",
      isWinner: Boolean(entry.isWinner),
    }));
  }
);
