import { FC } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { getAllUserVotes } from "@/db/query/get-all-user-votes";
import { RankTableCell } from "../tables/rank-table-cell";
import { NomineeTableCell } from "../tables/nominee-table-cell";

export const RankedVotesTable: FC<{
  userId: string;
}> = async ({ userId }) => {
  const userVotes = await getAllUserVotes(userId ?? "");

  const rankedVotesMap = new Map<
    string,
    { title: string; tmdbId: string; imagePath: string; count: number }
  >();

  userVotes.forEach((vote) => {
    const tmdbId = vote.nomination.secondaryNomineeTmdbId
      ? vote.nomination.secondaryNomineeTmdbId
      : vote.nomination.nomineeTmdbId ?? "other";
    if (rankedVotesMap.has(tmdbId)) {
      const existingEntry = rankedVotesMap.get(tmdbId);
      if (!existingEntry) return;
      rankedVotesMap.set(tmdbId, {
        ...existingEntry,
        count: existingEntry.count + 1,
      });
      return;
    }

    rankedVotesMap.set(tmdbId, {
      title:
        (vote.nomination.secondaryNomineeName
          ? vote.nomination.secondaryNomineeName
          : vote.nomination.nomineeName) ?? "",
      tmdbId:
        (vote.nomination.secondaryNomineeTmdbId
          ? vote.nomination.secondaryNomineeTmdbId
          : vote.nomination.nomineeTmdbId) ?? "",
      imagePath:
        (vote.nomination.secondaryNomineeTmdbId
          ? vote.nomination.secondaryNomineePosterPath
          : vote.nomination.nomineePosterPath) ?? "",
      count: 1,
    });
  });

  const rankedVotes = Array.from(rankedVotesMap.values()).sort(
    (a, b) => b.count - a.count
  );
  return (
    <Table divClassName="no-scrollbar max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Movie</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="no-scrollbar">
        {rankedVotes.map((vote, idx) => (
          <TableRow key={vote.tmdbId}>
            <RankTableCell rank={idx + 1} />
            <NomineeTableCell
              title={vote.title}
              tmdbId={vote.tmdbId}
              posterPath={vote.imagePath}
            />
            <TableCell className="text-right">{vote.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
