import { cache } from "react";
import { db } from "../db";

export const getCategoriesWithVote = cache(async (userId: string) => {
  const data = await db.query.votes.findMany({
    where: (votes, { eq }) => eq(votes.userId, userId),
    columns: {
      categoryId: true,
    },
  });
  return data.map((entry) => entry.categoryId) ?? [];
});
