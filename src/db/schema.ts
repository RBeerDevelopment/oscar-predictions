import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";

export const nominees = sqliteTable("nominees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  tmdbId: text("tmdb_id").unique(),
  tmdbPosterPath: text("tmdb_poster_path"),
  tmdbPosterBlurhash: text("tmdb_poster_blurhash"),
  type: text("type", { enum: ["movie", "person"] }),
});

export const nomineesRelations = relations(nominees, ({ many }) => ({
  nomineesToNominations: many(nominations, { relationName: "nominee" }),
  nomineesToSecondaryNominations: many(nominations, {
    relationName: "secondary_nominee",
  }),
}));

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").unique(),
  type: text("type", { enum: ["movie", "person"] }),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  categoriesToNominations: many(nominations),
  categoriesToVotes: many(votes),
}));

export const nominations = sqliteTable("nominations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nomineeId: integer("nominee_id")
    .notNull()
    .references(() => nominees.id),
  secondaryMovieId: integer("secondary_movie_id").references(() => nominees.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  description: text("description"),
  isWinner: integer("is_winner"),
});

export const nominationsRelations = relations(nominations, ({ one, many }) => ({
  nominee: one(nominees, {
    relationName: "nominee",
    fields: [nominations.nomineeId],
    references: [nominees.id],
  }),
  secondaryMovieNominee: one(nominees, {
    relationName: "secondary_nominee",
    fields: [nominations.secondaryMovieId],
    references: [nominees.id],
  }),
  category: one(categories, {
    fields: [nominations.categoryId],
    references: [categories.id],
  }),
  votes: many(votes),
}));

export const votes = sqliteTable(
  "votes",
  {
    userId: text("user_id").notNull(),
    nominationId: integer("nomination_id").notNull(),
    categoryId: integer("category_id").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.categoryId] }),
    userIdIndex: index("user_id_index").on(table.userId),
  })
);

export const votesRelations = relations(votes, ({ one }) => ({
  votesToNominations: one(nominations, {
    fields: [votes.nominationId],
    references: [nominations.id],
  }),
  votesToCategories: one(categories, {
    fields: [votes.categoryId],
    references: [categories.id],
  }),
}));

export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  feedback: text("feedback").notNull(),
  email: text("email"),
  createdAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

const logginEventTypes = ["signin-button"] as const;
export type LoggingEventType = (typeof logginEventTypes)[number];

export const logging = sqliteTable("logging", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  event: text("event", { enum: logginEventTypes }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
