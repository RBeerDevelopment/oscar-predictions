import { cache } from "react";
import { db } from "../db";

export const getExistingUserVote = cache(
  async (userId: string, categoryId: number): Promise<number | null> => {
    const vote = await db.query.votes.findFirst({
      where: (votes, { eq, and }) =>
        and(eq(votes.userId, userId), eq(votes.categoryId, categoryId)),
      columns: {
        nominationId: true,
      },
    });

    return vote?.nominationId ?? null;
  }
);
