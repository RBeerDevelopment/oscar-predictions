import { sqliteTable, integer, text, unique, index } from "drizzle-orm/sqlite-core"
import { baseColumns, eventTypes, nomineeTypes } from "./utils";

export const categories = sqliteTable("categories", {
	...baseColumns,
	name: text().notNull().unique(),
	type: text({ enum: nomineeTypes }).notNull().default("movie"),
});

export const academyAwards = sqliteTable("academy_awards", {
	...baseColumns,
	ceremonyYear: integer("ceremony_year").notNull().unique(),
	name: text("name").notNull().unique(),
	ceremonyDate: text("ceremony_date").notNull(),
});

export const nominees = sqliteTable("nominees", {
	...baseColumns,
	name: text().notNull(),
	tmdbId: text("tmdb_id").unique(),
	tmdbPosterPath: text("tmdb_poster_path"),
	tmdbPosterBlurhash: text("tmdb_poster_blurhash"),
	type: text({ enum: nomineeTypes }).notNull(),
	releaseYear: integer("release_year", { mode: "number" }),
}, (table) => [
	index("nominees_tmdb_id_idx").on(table.tmdbId),
	index("nominees_type_idx").on(table.type),
]);

export const nominations = sqliteTable("nominations", {
	...baseColumns,
	nomineeId: text("nominee_id").notNull().references(() => nominees.id),
	secondaryNomineeId: text("secondary_nominee_id").references(() => nominees.id),
	categoryId: text("category_id").notNull().references(() => categories.id),
	acdademyAwardsId: text("acdademy_awards_id").notNull().references(() => academyAwards.id),
	description: text(),
	isWinner: integer("is_winner", { mode: "boolean" }).notNull().default(false),
}, (table) => [
	unique().on(table.nomineeId, table.categoryId, table.acdademyAwardsId),
	index("nominations_nominee_id_idx").on(table.nomineeId),
	index("nominations_category_id_idx").on(table.categoryId),
	index("nominations_acdademy_awards_id_idx").on(table.acdademyAwardsId),
]);

export const votes = sqliteTable("votes", {
	...baseColumns,
	userId: text("user_id").notNull(),
	nominationId: text("nomination_id").notNull().references(() => nominations.id),
	categoryId: text("category_id").notNull().references(() => categories.id),
	academyAwardsId: text("academy_awards_id").notNull().references(() => academyAwards.id),
}, (table) => [
	unique().on(table.userId, table.categoryId, table.academyAwardsId),
	index("votes_user_id_idx").on(table.userId),
	index("votes_nomination_id_idx").on(table.nominationId),
	index("votes_category_id_idx").on(table.categoryId),
]);

export const feedback = sqliteTable("feedback", {
	...baseColumns,
	feedback: text("feedback").notNull(),
	email: text("email"),
});

export const eventLogs = sqliteTable("event_logs", {
	...baseColumns,
	eventType: text("event_type", { enum: eventTypes }).notNull(),
	userId: text("user_id").notNull(),
	data:  text('data', { mode: 'json' }).notNull().default("{}"),
}, (table) => [
	index("event_logs_event_type_idx").on(table.eventType),
	index("event_logs_user_id_idx").on(table.userId),
]);