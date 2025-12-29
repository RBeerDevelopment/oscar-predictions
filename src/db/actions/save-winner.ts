"use server";

import { and, eq, ne } from "drizzle-orm";
import { db } from "../db";
import { nominations } from "../schema";

export async function saveWinner(
  nominationId: string,
  categoryId: string
): Promise<void> {
  await db
    .update(nominations)
    .set({
      isWinner: true,
    })
    .where(eq(nominations.id, nominationId));

  await db
    .update(nominations)
    .set({
      isWinner: false,
    })
    .where(
      and(
        ne(nominations.id, nominationId),
        eq(nominations.categoryId, categoryId)
      )
    );
}
