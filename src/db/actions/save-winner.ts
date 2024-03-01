"use server";

import { and, eq, ne } from "drizzle-orm";
import { db } from "../db";
import { nominations } from "../schema";

export async function saveWinner(
  nominationId: number,
  categoryId: number
): Promise<void> {
  await db
    .update(nominations)
    .set({
      isWinner: 1,
    })
    .where(eq(nominations.id, nominationId));

  await db
    .update(nominations)
    .set({
      isWinner: null,
    })
    .where(
      and(
        ne(nominations.id, nominationId),
        eq(nominations.categoryId, categoryId)
      )
    );
}
