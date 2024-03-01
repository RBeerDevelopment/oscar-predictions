import { cache } from "react";
import { db } from "../db";

export const getCategories = cache(async (userId: string) => {
  const [categories, categoriesIdsWithVote] = await Promise.all([
    db.query.categories.findMany(),
    db.query.votes.findMany({
      where: (votes, { eq }) => eq(votes.userId, userId),
      columns: {
        categoryId: true,
      },
    }),
  ]);

  return categories.map((category) => ({
    ...category,
    hasVoted: categoriesIdsWithVote.some(
      (entry) => entry.categoryId === category.id
    ),
  }));
});
