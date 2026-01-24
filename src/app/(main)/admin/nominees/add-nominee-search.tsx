"use client";

import { FC, useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { searchTMDB, TMDBSearchResult, getMovieDetails, MovieDetails } from "@/db/actions/search-tmdb";
import { addNominee } from "@/db/actions/add-nominee";
import { EntityType } from "@/common/types/entity-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { buildImageUrl } from "@/common/utils/build-image-url";
import { cn } from "@/lib/utils";

type Props = {
  existingTmdbIds: string[]
}

export const AddNomineeSearch: FC<Props> = ({ existingTmdbIds }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<EntityType>("movie");
  const [searchResults, setSearchResults] = useState<TMDBSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentlyAdding, setCurrentlyAdding] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Record<number, MovieDetails>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [nomineeTmdbIds, setNomineeTmdbIds] = useState<string[]>(existingTmdbIds);

  const handleSearch = async () => {
    if (!searchQuery.trim() || searchType === "song") {
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await searchTMDB(searchQuery, searchType);

      results.sort((a, b) => { return new Date(b.release_date || "").getTime() - new Date(a.release_date || "").getTime() });
      setSearchResults(results);
    } catch (error) {
      toast.error("Failed to search TMDB");
      console.error(error);
    } finally {
      setIsSearching(false);
      searchInputRef.current?.blur();
    }
  };

  const handleAddSong = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a song title");
      return;
    }

    setCurrentlyAdding("song");
    try {
      const response = await addNominee(searchQuery.trim(), null, null, null, "song");
      
      if (response.success) {
        toast.success(`Successfully added "${searchQuery.trim()}" to nominees`);
        setSearchQuery("");
      } else {
        toast.error(response.error || "Failed to add song");
      }
    } catch (error) {
      toast.error("Failed to add song");
      console.error(error);
    } finally {
      setCurrentlyAdding(null);
      searchInputRef.current?.focus();
    }
  };

  const handleAddNominee = useCallback(async (result: TMDBSearchResult) => {
    const name = searchType === "movie" ? result.title : result.name;
    if (!name || !result.id) {
      toast.error("Invalid result data");
      return;
    }

    setCurrentlyAdding(result.id.toString()); 
    try {
      const entityType: EntityType = searchType as EntityType;
      const response = await addNominee(name, String(result.id), 
        result.release_date ?? null, 
        result.poster_path ?? null,
        entityType);
      
      if (response.success) {
        toast.success(`Successfully added ${name} to nominees`);
        setSearchQuery("");
        setSearchResults([]);
        setHasSearched(false);
        setNomineeTmdbIds((prev) => [...prev, String(result.id)]);
      } else {
        toast.error(response.error || "Failed to add nominee");
      }
    } catch (error) {
      toast.error("Failed to add nominee");
      console.error(error);
    } finally {
      setCurrentlyAdding(null);
      searchInputRef.current?.focus();
    }
  }, [searchType]);

  const getImagePath = (result: TMDBSearchResult) => {
    if (searchType === "movie") {
      return result.poster_path;
    }
    return result.profile_path;
  };

  const getTMDBUrl = (id: number) => {
    const baseUrl = "https://www.themoviedb.org";
    return searchType === "movie" 
      ? `${baseUrl}/movie/${id}`
      : `${baseUrl}/person/${id}`;
  };

  const handleCardClick = (result: TMDBSearchResult) => {
    if (result.id) {
      window.open(getTMDBUrl(result.id), "_blank", "noopener,noreferrer");
    }
  };

  // Fetch movie details when search results change (only for movies)
  useEffect(() => {
    if (searchType === "movie" && searchResults.length > 0) {
      const fetchDetails = async () => {
        const detailsMap: Record<number, MovieDetails> = {};
        
        // Fetch details for all movies in parallel
        const detailPromises = searchResults.slice(0,4).map(async (result) => {
          if (result.id) {
            const details = await getMovieDetails(result.id);
            detailsMap[result.id] = details;
          }
        });

        await Promise.all(detailPromises);
        setMovieDetails(detailsMap);
      };

      fetchDetails();
    } else {
      setMovieDetails({});
    }
  }, [searchResults, searchType]);

  // Handle keyboard shortcuts for adding nominees (1-9)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      const activeElement = document.activeElement;
      if (activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA") {
        return;
      }

      // Check if a number key (1-9) was pressed
      const keyNumber = parseInt(e.key);
      if (isNaN(keyNumber) || keyNumber < 1 || keyNumber > 9) {
        return;
      }

      // Check if search results exist and the index is valid
      if (searchResults.length === 0 || searchResults.length < keyNumber) {
        return;
      }

      // Don't trigger if currently adding a nominee
      if (currentlyAdding) {
        return;
      }

      // Get the result at the corresponding index (1-based to 0-based)
      const result = searchResults[keyNumber - 1];
      if (!result) {
        return;
      }

      // Check if nominee already exists
      if (existingTmdbIds.includes(String(result.id))) {
        toast.error("Nominee already exists");
        return;
      }

      // Add the nominee
      handleAddNominee(result);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchResults, currentlyAdding, existingTmdbIds, handleAddNominee]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add Nominee</CardTitle>
        <CardDescription>
          {searchType === "song" 
            ? "Enter a song title to add it to the nominees table"
            : "Search for a movie or person on TMDB and add them to the nominees table"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select
            value={searchType}
            onValueChange={(value) => {
              setSearchType(value as EntityType);
              setSearchResults([]);
              setHasSearched(false);
              setSearchQuery("");
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EntityType).map((type) => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder={searchType === "song" ? "Enter song title..." : `Search for a ${searchType}...`}
            value={searchQuery}
            ref={searchInputRef}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchType === "song") {
                  handleAddSong();
                } else {
                  handleSearch();
                }
              }
            }}
            className="flex-1"
          />
          {searchType === "song" ? (
            <Button onClick={handleAddSong} disabled={Boolean(currentlyAdding) || !searchQuery.trim()}>
              {currentlyAdding === "song" ? "Adding..." : "Add Song"}
            </Button>
          ) : (
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {searchResults.map((result) => {
                const name = searchType === "movie" ? result.title : result.name;
                const imagePath = getImagePath(result);
                const details = movieDetails[result.id] || {};
                
                // Extract release year from release_date
                const releaseYear = result.release_date
                  ? new Date(result.release_date).getFullYear()
                  : undefined;
                
                return (
                  <Card 
                    key={result.id} 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleCardClick(result)}
                  >
                    <div className="flex gap-4 items-center">
                      {imagePath ? (
                        <img
                          src={buildImageUrl(imagePath, false)}
                          alt={name || "No image"}
                          className="w-16 h-24 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{name || "Unknown"}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {searchType === "movie" && (
                            <>
                              {releaseYear && (
                                <p>Release Year: {releaseYear}</p>
                              )}
                              {details.director && (
                                <p>Director: {details.director}</p>
                              )}
                              {details.runtime && (
                                <p>Runtime: {details.runtime} min</p>
                              )}
                            </>
                          )}
                          <p>TMDB ID: {result.id}</p>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (existingTmdbIds.includes(String(result.id))) {
                            toast.error("Nominee already exists");
                            return;
                          }

                          handleAddNominee(result);
                        }}
                        className={cn(existingTmdbIds.includes(String(result.id)) ? "opacity-50 cursor-not-allowed" : "")}
                        disabled={Boolean(currentlyAdding) || existingTmdbIds.includes(String(result.id))}
                        size="sm"
                      >
                        {currentlyAdding === result.id.toString() ? "Adding..." : existingTmdbIds.includes(String(result.id)) ? "Already Added" : "Add"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {searchResults.length === 0 && hasSearched && !isSearching && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No results found. Try a different search query.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

