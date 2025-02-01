import { z } from "zod";
import { EntityType } from "./entity-type";

export const UserVote = z.object({
  category: z.object({
    id: z.number(),
    name: z.string().nullable(),
    type: z.enum(EntityType).nullable(),
  }),
  nomination: z.object({
    id: z.number(),
    description: z.string().nullable(),
    nomineeName: z.string().nullable(),
    nomineeTmdbId: z.string().nullable(),
    nomineePosterPath: z.string().nullable(),
    secondaryNomineeName: z.string().nullable(),
    secondaryNomineeTmdbId: z.string().nullable(),
    secondaryNomineePosterPath: z.string().nullable(),
    isWinner: z.boolean(),
  }),
});

export type UserVote = z.infer<typeof UserVote>;
