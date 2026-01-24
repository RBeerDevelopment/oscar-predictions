import { FC } from "react";
import { Card } from "@/components/ui/card";
import { NominationWithNominee } from "@/types";
import Image from "next/image";
import { VoteButton } from "./vote-button";
import { buildImageUrl } from "@/common/utils/build-image-url";
import { blurHashToDataURL } from "@/common/utils/blurhash-to-data-url";
import { WinningMedal } from "../winning-medal";

export const NomineeCard: FC<{
  categoryId: string;
  nominee: NominationWithNominee;
  isExistingVote: boolean;
  isVotingOver: boolean;
}> = async ({ categoryId, nominee, isExistingVote, isVotingOver }) => {
  const blurhashUrl = blurHashToDataURL(nominee.nominee?.tmdbPosterBlurhash ?? "");
  return (
    <Card
      className={`relative flex flex-col gap-2 p-0 hover:shadow-lg transition-shadow ${
        isExistingVote ? "bg-pink-600 text-white" : ""
      }`}
    >
      {nominee.isWinner ? (
        <WinningMedal className="absolute top-1 right-1" />
      ) : null}
      {nominee.nominee?.tmdbId && (
        <a
          className="w-full"
          key={nominee.nominee.tmdbId}
          href={`https://www.themoviedb.org/movie/${nominee.nominee.tmdbId}`}
          target="_blank"
        >
          <Image
            className="rounded-t-md w-full"
            src={buildImageUrl(nominee.nominee.tmdbPosterPath, true)}
            alt={`Poster of ${nominee.nominee.name}`}
            blurDataURL={blurhashUrl}
            placeholder="blur"
            width={400}
            height={600}
          />
        </a>
      )}

      <div className="flex flex-col items-center text-center p-4 gap-2 h-full min-h-[10rem]">
        <h4 className="text-xl font-bold">{nominee.nominee?.name ?? "Unknown"}</h4>
        <p className="text-xs ">{nominee.description}</p>

        <VoteButton
          isVotingOver={isVotingOver}
          isExistingVote={isExistingVote}
          categoryId={categoryId}
          nominationId={nominee.nominationId}
        />
      </div>
    </Card>
  );
};
