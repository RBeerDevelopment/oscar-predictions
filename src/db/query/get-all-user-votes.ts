import { cache } from "react";
import { db } from "../db";
import { UserVote } from "@/common/types/user-vote";

export const getAllUserVotes = cache(
  async (userId: string): Promise<UserVote[]> => {
    const data = await db.query.votes.findMany({
      where: (votes, { eq }) => eq(votes.userId, userId),

      columns: {
        categoryId: true,
        nominationId: true,
      },
      with: {
        votesToNominations: {
          columns: {
            description: true,
          },
          with: {
            nominee: {
              columns: {
                name: true,
                tmdbId: true,
                tmdbPosterPath: true,
              },
            },
            secondaryMovieNominee: {
              columns: { name: true, tmdbId: true, tmdbPosterPath: true },
            },
          },
        },
        votesToCategories: {
          columns: {
            name: true,
            type: true,
          },
        },
      },
    });

    return data
      .map((entry) => {
        return UserVote.parse({
          category: {
            id: entry.categoryId,
            name: entry.votesToCategories.name,
            type: entry.votesToCategories.type,
          },
          nomination: {
            id: entry.nominationId,
            description: entry.votesToNominations.description,
            nomineeName: entry.votesToNominations.nominee.name,
            nomineeTmdbId: entry.votesToNominations.nominee.tmdbId,
            nomineePosterPath: entry.votesToNominations.nominee.tmdbPosterPath,
            secondaryNomineeName:
              entry.votesToNominations.secondaryMovieNominee?.name ?? null,
            secondaryNomineeTmdbId:
              entry.votesToNominations.secondaryMovieNominee?.tmdbId ?? null,
            secondaryNomineePosterPath:
              entry.votesToNominations.secondaryMovieNominee?.tmdbPosterPath ??
              null,
          },
        });
      })
      .sort((a, b) => a.category.id - b.category.id);
  }
);
