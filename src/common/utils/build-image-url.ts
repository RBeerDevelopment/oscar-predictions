import { TMDB_IMAGE_BASE_URL } from "@/tmdb-api/const";

export function buildImageUrl(path: string | null, isLarge = false) {
  return `${TMDB_IMAGE_BASE_URL}/${isLarge ? "w400" : "w200"}/${path}`;
}
