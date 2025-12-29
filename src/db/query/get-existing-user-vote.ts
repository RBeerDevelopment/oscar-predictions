import { cache } from "react";
import { db } from "../db";

export const getExistingUserVote = cache(
  async (userId: string, categoryId: string): Promise<string | null> => {
    const vote = await db.query.votes.findFirst({
      where: { userId: userId, category: { id: categoryId } },
      columns: {
        nominationId: true,
      },
    });

    return vote?.nominationId ?? null;
  }
);
