import { createHash } from "crypto";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";
import mysql from "mysql2/promise";
import { loadEnvConfig } from "@next/env";
import { parseMysqlConnectionString } from "../src/lib/db/connection-config";

export async function migrate() {
  loadEnvConfig(process.cwd());
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Brak DATABASE_URL.");

  const connection = await mysql.createConnection(parseMysqlConnectionString(url));
  try {
    await connection.execute("CREATE TABLE IF NOT EXISTS `_crevis_migrations` (`name` varchar(255) PRIMARY KEY, `checksum` varchar(64) NOT NULL, `applied_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    const directory = resolve(process.cwd(), "drizzle");
    const files = (await readdir(directory)).filter((name) => name.endsWith(".sql")).sort();

    for (const name of files) {
      const sql = await readFile(resolve(directory, name), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT checksum FROM `_crevis_migrations` WHERE name = ?", [name]);
      if (rows[0]) {
        if (rows[0].checksum !== checksum) throw new Error(`Migracja ${name} została zmieniona po zastosowaniu.`);
        continue;
      }

      const statements = sql.split(/;\s*(?:\r?\n|$)/).map((part) => part.trim()).filter(Boolean);
      await connection.beginTransaction();
      try {
        for (const statement of statements) {
          try {
            await connection.query(statement);
          } catch (error) {
            if ((error as { code?: string }).code !== "ER_TABLE_EXISTS_ERROR") throw error;
          }
        }
        await connection.execute("INSERT INTO `_crevis_migrations` (name, checksum) VALUES (?, ?)", [name, checksum]);
        await connection.commit();
        console.log(`Zastosowano ${name}`);
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }
  } finally {
    await connection.end();
  }
}

if (process.argv[1]?.endsWith("migrate.ts")) {
  void migrate().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
