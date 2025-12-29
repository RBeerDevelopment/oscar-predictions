"use server";

import { db } from "../db";
import { eventLogs } from "../schema";
import { eventTypes } from "../utils";

export type LoggingEventType = typeof eventTypes[number];

export async function logAction(type: LoggingEventType, userId: string, data?: Record<string, unknown>): Promise<void> {
  await db.insert(eventLogs).values({
    eventType: type,
    userId,
    data: data ? JSON.stringify(data) : "{}",
  });
}
