"use server";

import { TMDB_API_BASE_URL } from "@/tmdb-api/const";

export type TMDBSearchResult = {
  id: number;
  name?: string; // For people
  title?: string; // For movies
  poster_path?: string | null;
  profile_path?: string | null;
  media_type?: string;
  release_date?: string; // For movies
};

export type TMDBSearchResponse = {
  results: TMDBSearchResult[];
};

export async function searchTMDB(
  query: string,
  type: "movie" | "person"
): Promise<TMDBSearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const searchType = type === "movie" ? "movie" : "person";
  const url = `${TMDB_API_BASE_URL}/search/${searchType}?query=${encodeURIComponent(query)}&include_adult=false`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    const data: TMDBSearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching TMDB:", error);
    return [];
  }
}

export type MovieDetails = {
  runtime?: number;
  director?: string;
};

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    // Fetch movie details and credits in parallel
    const [movieResponse, creditsResponse] = await Promise.all([
      fetch(`${TMDB_API_BASE_URL}/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }),
      fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }),
    ]);

    if (!movieResponse.ok || !creditsResponse.ok) {
      return {};
    }

    const movieData = await movieResponse.json();
    const creditsData = await creditsResponse.json();

    const director = creditsData.crew?.find(
      (member: { job: string }) => member.job === "Director"
    )?.name;

    return {
      runtime: movieData.runtime || undefined,
      director: director || undefined,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {};
  }
}

