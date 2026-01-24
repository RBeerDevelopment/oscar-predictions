import { cache } from "react";
import { db } from "../db";

export const getAllNominees = cache(async () => {
  const nomineesList = await db.query.nominees.findMany({
    columns: {
      id: true,
      tmdbId: true,
      name: true,
      type: true,
      tmdbPosterPath: true,
    },
    where: { 
      OR: [
        { releaseYear: 2025 },
        { releaseYear: 2024 },
        { releaseYear: { isNull: true } },
      ]
    },
    orderBy: { "name": "asc" }
  });


  return nomineesList;
});

