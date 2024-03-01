import { cache } from "react";
import { db } from "../db";
import { sql } from "drizzle-orm";

type VoteCount = {
  isWinner: boolean | null;
  categoryId: number;
  categoryName: string;
  nomineeName: string;
  voteCount: number;
  tmdbId: string;
  tmdbPosterPath: string;
};

export const getVoteCounts = cache(async () => {
  const statement = sql`
    SELECT 
      nominations.is_winner as isWinner, categories.id as categoryId, categories.name as categoryName, nominees.name as nomineeName, nominees.tmdb_id as tmdbId, nominees.tmdb_poster_path as tmdbPosterPath, COUNT(votes.user_id) as voteCount FROM categories 
        INNER JOIN nominations ON categories.id = nominations.category_id
        LEFT JOIN votes ON votes.nomination_id = nominations.id
        INNER JOIN nominees ON nominees.id = nominations.nominee_id
        GROUP BY nominees.name, categories.id
        ORDER BY categoryId, voteCount DESC;
  `;

  const data = await db.all<VoteCount>(statement).execute();

  return data;
});
