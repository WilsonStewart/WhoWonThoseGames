import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("player")
    .addColumn("id", "uuid", (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`)
        .notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
