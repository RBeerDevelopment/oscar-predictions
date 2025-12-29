"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { categories } from "../schema";
import { EntityType } from "@/common/types/entity-type";

export async function addCategory(
  name: string,
  type: EntityType
): Promise<{ success: boolean; error?: string }> {
  try {
    const existing = await db.query.categories.findFirst({ 
        where: {
            name
        }
    });

    if (existing) {
      return {
        success: false,
        error: "A category with this name already exists",
      };
    }

    await db.insert(categories).values({
      name,
      type,
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Error adding category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

