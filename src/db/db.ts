import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { DB } from "./db-types";

const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database("db/main.db"),
  }),
});

export default db;
