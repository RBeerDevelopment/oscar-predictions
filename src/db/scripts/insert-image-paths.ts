import { getImagePath } from "@/tmdb-api/get-image-href";
import { db } from "../db";
import { nominees } from "../schema";
import { eq, isNull } from "drizzle-orm";

async function insertPosterPaths() {
  console.time("insert");
  const data = await db.query.nominees.findMany({
    columns: {
      tmdbId: true,
      type: true,
    },
    where: isNull(nominees.tmdbPosterPath),
  });

  if (!data) return;
  const entries = data.map((entry) => ({
    id: entry.tmdbId,
    type: entry.type,
  }));

  const pathPromises = entries.map((entry) =>
    getImagePath(entry.id ?? "", (entry.type ?? "movie") as EntityType)
  );

  const paths = await Promise.all(pathPromises);

  const updatePromises = paths.map((path, idx) =>
    db
      .update(nominees)
      .set({ tmdbPosterPath: path.replace("/", "") })
      .where(eq(nominees.tmdbId, entries[idx].id ?? ""))
  );

  await Promise.all(updatePromises);
  console.timeEnd("insert");
}

insertPosterPaths();
