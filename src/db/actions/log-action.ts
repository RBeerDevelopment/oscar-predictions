"use server";

import { db } from "../db";
import { LoggingEventType, logging } from "../schema";

export async function logAction(type: LoggingEventType): Promise<void> {
  await db.insert(logging).values({
    event: type,
    createdAt: new Date(),
  });
}
