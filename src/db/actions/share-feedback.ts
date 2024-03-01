"use server";

import { db } from "../db";
import { feedback } from "../schema";

export async function shareFeedback(
  feedbackText: string,
  userEmail: string | null
): Promise<void> {
  await db.insert(feedback).values({
    feedback: feedbackText,
    email: userEmail,
    createdAt: new Date(),
  });
}
