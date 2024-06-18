import * as path from "path";
import Database from "better-sqlite3";
import { promises as fs } from "fs";
import { Kysely, Migrator, SqliteDialect, FileMigrationProvider } from "kysely";

import "dotenv/config";

async function migrateDownFully() {
  const db = new Kysely({
    dialect: new SqliteDialect({
      database: new Database("db/main.db"),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateTo("migration_0-0000");

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateDownFully();
