"use server";

import { db } from "../db";
import { nominations, academyAwards } from "../schema";
import { eq } from "drizzle-orm";

export async function addNomination(
  nomineeId: string,
  categoryId: string,
  description: string | null,
  year: "2024" | "2025" | "2026" | null,
  secondaryNomineeId: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    // Find the academy awards for the given year
    const academyAward = await db.query.academyAwards.findFirst({
      where: { ceremonyYear: year ? parseInt(year) : 2026 },
    });

    if (!academyAward) {
      return {
        success: false,
        error: "Academy Awards not found for the given year",
      };
    }

    await db.insert(nominations).values({
      nomineeId,
      categoryId,
      acdademyAwardsId: academyAward.id,
      description: description ?? null,
      secondaryNomineeId: secondaryNomineeId ?? null,
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding nomination:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

