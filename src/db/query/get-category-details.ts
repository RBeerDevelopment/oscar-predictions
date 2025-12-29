import { cache } from "react";
import { db } from "../db";

export const getCategoryDetails = cache((id: string) => {
  return db.query.categories.findFirst({
    where: { id },
  });
});
