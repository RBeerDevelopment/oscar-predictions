"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { nominees } from "../schema";
import { EntityType } from "@/common/types/entity-type";

export async function addNominee(
  name: string,
  tmdbId: string | null,
  type: EntityType
): Promise<{ success: boolean; error?: string }> {
  try {
    // For songs, check if a nominee with the same name and type already exists
    if (type === "song") {
      const existing = await db.query.nominees.findFirst({
        where: { name, type: "song" },
      });

      if (existing) {
        return {
          success: false,
          error: "A song with this name already exists",
        };
      }
    } else {
      // For movies/persons, check if nominee with this tmdbId already exists
      if (!tmdbId) {
        return {
          success: false,
          error: "TMDB ID is required for movies and persons",
        };
      }

      const existing = await db.query.nominees.findFirst({
        where: { tmdbId },
      });

      if (existing) {
        return {
          success: false,
          error: "A nominee with this TMDB ID already exists",
        };
      }
    }

    await db.insert(nominees).values({
      name,
      tmdbId: tmdbId || null,
      type,
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding nominee:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

