import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const timestampColumns = {
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
}

export const idColumns = {
    id: text().$defaultFn(createId).primaryKey(),
}

export const baseColumns = {
    ...idColumns,
    ...timestampColumns,
}