"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { votes } from "../schema";

export async function voteForNomination(
  userId: string,
  categoryId: string,
  nominationId: string
): Promise<void> {

  console.log("voting for nomination", userId, categoryId, nominationId);

  const nomination = await db.query.nominations.findFirst({
    where: {
      id: nominationId
    },
    with: {
      academyAward: true
    }
  });

  if(!nomination?.academyAward) {
    throw new Error("Nomination not found");
  }

  console.log("academy award", nomination?.academyAward?.id);

  await db
    .insert(votes)
    .values({
      userId,
      nominationId,
      categoryId,
      academyAwardsId: nomination?.academyAward?.id!,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [votes.userId, votes.categoryId, votes.academyAwardsId],
      set: { nominationId, updatedAt: new Date() },
    });

  // revalidatePath(`/vote/${categoryId}`);
  revalidatePath(`/vote`, "layout");
  revalidatePath(`/dashboard`);
}
