import { cache } from "react";
import { db } from "../db";

export const getCurrentAcademyAwards = cache(() => {
    return db.query.academyAwards.findFirst({
      orderBy: {
        "ceremonyYear": "desc"
      }
    });
  });