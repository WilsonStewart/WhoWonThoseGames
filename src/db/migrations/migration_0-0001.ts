import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("display_name", "varchar", (col) => col.unique())
    .addColumn("auth_provider", "varchar")
    .execute();

  await db.schema
    .createTable("players")
    .addColumn("id", "varchar", (col) => col.unique().notNull())
    .addColumn("name", "varchar", (col) => col.primaryKey().unique())
    .addColumn("display_name", "varchar", (col) => col.unique())
    .addColumn("profile_picture_path", "varchar")
    .execute();

  await db.schema
    .createTable("titles")
    .addColumn("id", "varchar", (col) => col.primaryKey().unique().notNull())
    .addColumn("name", "varchar", (col) => col.unique())
    .addColumn("display_name", "varchar", (col) => col.unique())
    .execute();

  await db.schema
    .createTable("user_title_collections")
    .addColumn("user_id", "varchar", (col) =>
      col.primaryKey().references("users.id").notNull()
    )
    .addColumn("title_id", "varchar", (col) =>
      col.references("titles.id").notNull()
    )
    .execute();

  await db.schema
    .createTable("games")
    .addColumn("id", "varchar", (col) => col.primaryKey().unique().notNull())
    .addColumn("description", "varchar")
    .addColumn("location", "varchar")
    .addColumn("title", "varchar", (col) =>
      col.references("titles.id").notNull()
    )
    .addColumn("date", "varchar", (col) => col.notNull())
    .addColumn("player_count", "numeric", (col) => col.notNull())
    .addColumn("player_names", "varchar")
    .addColumn("winner", "varchar", (col) => col.references("players.name"))
    .addColumn("ranking", "numeric")
    .execute();

  await db.schema
    .createTable("records")
    .addColumn("id", "varchar", (col) => col.primaryKey().unique().notNull())
    .addColumn("title_id", "varchar", (col) => col.references("titles.id"))
    .addColumn("name", "varchar", (col) => col.unique().notNull())
    .addColumn("display_name", "varchar", (col) => col.unique().notNull())
    .addColumn("description", "varchar")
    .execute();

  await db.schema
    .createTable("record_entries")
    .addColumn("id", "varchar", (col) => col.primaryKey().unique().notNull())
    .addColumn("record_id", "varchar", (col) => col.references("record.id"))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("record_entries").execute();
  await db.schema.dropTable("records").execute();
  await db.schema.dropTable("games").execute();
  await db.schema.dropTable("user_title_collections").execute();
  await db.schema.dropTable("titles").execute();
  await db.schema.dropTable("players").execute();
  await db.schema.dropTable("users").execute();
}
