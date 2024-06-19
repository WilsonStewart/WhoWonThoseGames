import fastify from "fastify";
import { v4 as uuidv4 } from "uuid";

import db from "./db/db";

export const server = fastify();

server.get("/health", async (req, res) => {
  res.code(200);
  return "ok";
});

server.get("/sheep", async (req, res) => {
  // return await db
  //   .insertInto("games_agricola_zman")
  //   .values({
  //     id: uuidv4(),
  //     sheep: 1,
  //     score: 25,
  //   })
  //   .execute();
  const result = await db
    .insertInto("titles")
    .values({
      id: uuidv4(),
      name: "Agricola - zMAN Games 2",
    })
    .execute();

  return result.toString();
});

server.get("/game/:id", async (req, res) => {
  return await db
    .selectFrom("games")
    .selectAll()
    .where("id", "=", req.id)
    .execute();
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
