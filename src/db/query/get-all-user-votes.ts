import { cache } from "react";
import { db } from "../db";
import { UserVote } from "@/common/types/user-vote";

export const getAllUserVotes = cache(
  async (userId: string): Promise<UserVote[]> => {
    const data = await db.query.votes.findMany({
      where: { userId },

      columns: {
        categoryId: true,
        nominationId: true,
      },
      with: {
        nomination: {
          columns: {
            description: true,
            isWinner: true,
          },
          with: {
            nominee: {
              columns: {
                name: true,
                tmdbId: true,
                tmdbPosterPath: true,
              },
            },
            secondaryNominee: {
              columns: { name: true, tmdbId: true, tmdbPosterPath: true },
            },
          },
        },
        category: {
          columns: {
            name: true,
            type: true,
          },
        },
      },
    });

    return data
      .filter((entry) => entry.category && entry.nomination && entry.nomination.nominee)
      .map((entry) => {
        return UserVote.parse({
          category: {
            id: entry.categoryId,
            name: entry.category!.name,
            type: entry.category!.type,
          },
          nomination: {
            id: entry.nominationId,
            description: entry.nomination!.description,
            nomineeName: entry.nomination!.nominee!.name,
            nomineeTmdbId: entry.nomination!.nominee!.tmdbId,
            nomineePosterPath: entry.nomination!.nominee!.tmdbPosterPath,
            secondaryNomineeName:
              entry.nomination!.secondaryNominee?.name ?? null,
            secondaryNomineeTmdbId:
              entry.nomination!.secondaryNominee?.tmdbId ?? null,
            secondaryNomineePosterPath:
              entry.nomination!.secondaryNominee?.tmdbPosterPath ??
              null,
            isWinner: Boolean(entry.nomination!.isWinner),
          },
        });
      })
      .sort((a, b) => a.category.id.localeCompare(b.category.id));
  }
);
