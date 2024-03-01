export type Nominee = {
  nominationId: number;
  name: string;
  description: string;
  type: EntityType;
  tmdbId: string;
  tmdbPosterPath: string | null;
  posterBlurhash: string | null;
  isWinner: boolean | null;
};
