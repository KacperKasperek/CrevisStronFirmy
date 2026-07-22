import "server-only";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { crevisPool?: mysql.Pool };
function getPool() {
  const url = process.env.DATABASE_URL;
  return globalForDb.crevisPool ?? mysql.createPool({ uri: url ?? "mysql://root:root@127.0.0.1:3306/crevis", connectionLimit: 8, enableKeepAlive: true });
}
export const pool = getPool();
if (process.env.NODE_ENV !== "production") globalForDb.crevisPool = pool;
export const db = drizzle({ client: pool, schema, mode: "default" });
