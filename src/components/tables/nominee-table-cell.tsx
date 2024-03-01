import { FC } from "react";
import { TableCell } from "../ui/table";
import Image from "next/image";
import { buildImageUrl } from "@/common/utils/build-image-url";

export const NomineeTableCell: FC<{
  title: string;
  posterPath: string;
  tmdbId: string;
}> = ({ title, posterPath, tmdbId }) => {
  return (
    <TableCell className="flex flex-row items-center justify-end gap-4">
      <a
        className="hover:underline text-right"
        href={`https://www.themoviedb.org/movie/${tmdbId}`}
        target="_blank"
      >
        {title}
      </a>
      <Image
        className="rounded-sm overflow-hidden shrink-0"
        width={36}
        height={44}
        src={buildImageUrl(posterPath)}
        alt={`Poster for ${title}`}
      />
    </TableCell>
  );
};
