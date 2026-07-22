import "server-only";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { parseMysqlConnectionString } from "./connection-config";

const globalForDb = globalThis as unknown as { crevisPool?: mysql.Pool };
function getPool() {
  const url = process.env.DATABASE_URL;
  const connection = parseMysqlConnectionString(url ?? "mysql://root:root@127.0.0.1:3306/crevis");
  return globalForDb.crevisPool ?? mysql.createPool({ ...connection, connectionLimit: 8, enableKeepAlive: true });
}
export const pool = getPool();
if (process.env.NODE_ENV !== "production") globalForDb.crevisPool = pool;
export const db = drizzle({ client: pool, schema, mode: "default" });
