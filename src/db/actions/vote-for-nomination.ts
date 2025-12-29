"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { votes } from "../schema";

export async function voteForNomination(
  userId: string,
  categoryId: string,
  nominationId: string
): Promise<void> {
  await db
    .insert(votes)
    .values({
      userId,
      nominationId,
      categoryId,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [votes.userId, votes.nominationId, votes.categoryId],
      set: { nominationId, updatedAt: new Date() },
    });

  // revalidatePath(`/vote/${categoryId}`);
  revalidatePath(`/vote`, "layout");
  revalidatePath(`/dashboard`);
}
