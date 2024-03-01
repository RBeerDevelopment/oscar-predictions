import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Nominee } from "@/common/types/nominee";
import Image from "next/image";
import { VoteButton } from "./vote-button";
import { buildImageUrl } from "@/common/utils/build-image-url";
import { blurHashToDataURL } from "@/common/utils/blurhash-to-data-url";
import { WinningMedal } from "../winning-medal";

export const NomineeCard: FC<{
  categoryId: number;
  nominee: Nominee;
  isExistingVote: boolean;
}> = async ({ categoryId, nominee, isExistingVote }) => {
  const blurhashUrl = blurHashToDataURL(nominee.posterBlurhash ?? "");
  return (
    <Card
      className={`relative flex flex-col gap-2 p-0 hover:shadow-lg transition-shadow ${
        isExistingVote ? "bg-pink-600 text-white" : ""
      }`}
    >
      {nominee.isWinner ? (
        <WinningMedal className="absolute top-1 right-1" />
      ) : null}
      <a
        className="w-full"
        key={nominee.tmdbId}
        href={`https://www.themoviedb.org/${nominee.type}/${nominee.tmdbId}`}
        target="_blank"
      >
        <Image
          className="rounded-t-md w-full"
          src={buildImageUrl(nominee.tmdbPosterPath, true)}
          alt={`Poster of ${nominee.name}`}
          blurDataURL={blurhashUrl}
          placeholder="blur"
          width={400}
          height={600}
        />
      </a>

      <div className="flex flex-col items-center text-center p-4 gap-2 h-full min-h-[10rem]">
        <h4 className="text-xl font-bold">{nominee.name}</h4>
        <p className="text-xs ">{nominee.description}</p>

        <VoteButton
          isExistingVote={isExistingVote}
          categoryId={categoryId}
          nominationId={nominee.nominationId}
        />
      </div>
    </Card>
  );
};
