export const EntityType = ["movie", "person", "song"] as const;

export type EntityType = (typeof EntityType)[number];
