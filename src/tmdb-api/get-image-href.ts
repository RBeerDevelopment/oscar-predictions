import { TmdbImageResponse } from "@/common/types/tmdb-image-response";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL } from "./const";

export async function getImagePath(
  entityId: string,
  type: EntityType
): Promise<string> {
  const result = await fetch(
    `${TMDB_API_BASE_URL}/${type}/${entityId}/images?include_image_language=en`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  const data: TmdbImageResponse = await result.json();

  const filePath =
    data?.[type === "movie" ? "posters" : "profiles"]?.at(0)?.file_path;

  return filePath ?? "";
}
