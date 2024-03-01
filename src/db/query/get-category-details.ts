import { cache } from "react";
import { db } from "../db";

export const getCategoryDetails = cache((id: number) => {
  return db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.id, id),
  });
});
