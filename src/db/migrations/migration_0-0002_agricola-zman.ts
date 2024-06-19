import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("games_agricola_zman")
    .addColumn("id", "varchar", (col) =>
      col.primaryKey().references("games.id").notNull()
    )
    .addColumn("fields", "numeric", (col) => col.defaultTo(0))
    .addColumn("pastures", "numeric", (col) => col.defaultTo(0))
    .addColumn("grains", "numeric", (col) => col.defaultTo(0))
    .addColumn("vegetables", "numeric", (col) => col.defaultTo(0))
    .addColumn("sheep", "numeric", (col) => col.defaultTo(0))
    .addColumn("wild_boar", "numeric", (col) => col.defaultTo(0))
    .addColumn("cattle", "numeric", (col) => col.defaultTo(0))
    .addColumn("unused_spaces", "numeric", (col) => col.defaultTo(13))
    .addColumn("fenced_stables", "numeric", (col) => col.defaultTo(0))
    .addColumn("clay_rooms", "numeric", (col) => col.defaultTo(0))
    .addColumn("stone_rooms", "numeric", (col) => col.defaultTo(0))
    .addColumn("family_members", "numeric", (col) => col.defaultTo(2))
    .addColumn("card_points", "numeric", (col) => col.defaultTo(0))
    .addColumn("bonus_points", "numeric", (col) => col.defaultTo(0))
    .addColumn("major_improvements_played", "numeric", (col) =>
      col.defaultTo(0)
    )
    .addColumn("minor_improvements_played", "numeric", (col) =>
      col.defaultTo(0)
    )
    .addColumn("occupations_played", "numeric", (col) => col.defaultTo(0))
    .addColumn("score", "numeric", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("games_agricola_zman").execute();
}
