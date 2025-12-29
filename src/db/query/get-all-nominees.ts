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
      nominations: {
        academyAward: {
          ceremonyYear: 2026
        }
      }
    },
    // where: (nominees, { eq }) => eq(nominees.year, "2026"),
    orderBy: { "name": "asc" }
  });

  return nomineesList;
});

