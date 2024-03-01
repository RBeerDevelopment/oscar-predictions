import { FC } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import Link from "next/link";
import Image from "next/image";
import { buildImageUrl } from "@/common/utils/build-image-url";
import { getAllUserVotes } from "@/db/query/get-all-user-votes";
import { WinningMedal } from "../winning-medal";

export const OwnPredictionsTable: FC<{
  userId: string;
}> = async ({ userId }) => {
  const userVotes = await getAllUserVotes(userId ?? "");

  const hasWinners = userVotes.some((vote) => vote.nomination.isWinner);
  return (
    <Table divClassName="no-scrollbar max-h-full" className="no-scrollbar">
      <TableHeader>
        <TableRow>
          {hasWinners ? <TableHead /> : null}
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Predictions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="no-scrollbar">
        {userVotes.map((vote) => (
          <TableRow key={vote.category.id}>
            {hasWinners ? (
              <TableCell className="w-8">
                {vote.nomination.isWinner ? <WinningMedal isInverted /> : null}
              </TableCell>
            ) : null}
            <TableCell>
              <Link
                className="hover:underline"
                href={`/vote/${vote.category.id}`}
              >
                {vote.category.name}
              </Link>
            </TableCell>
            <TableCell className="text-right flex flex-row gap-2 items-center justify-end pr-1 md:pr-4">
              <a
                className="hover:underline"
                href={`https://www.themoviedb.org/${vote.category.type}/${vote.nomination.nomineeTmdbId}`}
                target="_blank"
              >
                {vote.nomination.nomineeName}
              </a>
              <Image
                className="rounded-sm overflow-hidden shrink-0"
                width={36}
                height={44}
                src={buildImageUrl(vote.nomination.nomineePosterPath)}
                alt={`Mini icon for ${vote.nomination.nomineeName}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
