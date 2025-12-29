import { categories, nominations, nominees } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type MinimalCategory = Pick<InferSelectModel<typeof categories>, "id" | "name">;
export type Nominee = InferSelectModel<typeof nominees>;
export type Nomination = InferSelectModel<typeof nominations>;

export type NominationWithNominee = Pick<Nomination, "id" | "description" | "isWinner"> & {
    nominationId: string;
    tmdbId: string | null;
    nominee: Pick<Nominee, "id" | "name" | "tmdbId" | "tmdbPosterPath" | "tmdbPosterBlurhash"> | null
};

// expands object types one level deep
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively
type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;

export type test = ExpandRecursively<NominationWithNominee>;