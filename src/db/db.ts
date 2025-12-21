import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_AUTH_TOKEN ?? "",
});

const result = await client.execute("select 1;");

export const db = drizzle(client, { schema });
