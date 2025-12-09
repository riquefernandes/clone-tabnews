import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function status(request, response) {
  if (request.method === "GET") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    console.log("entrou no get");

    return response.status(200).json(migrations);
  }
  if (request.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    console.log("entrou no post");
    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}

export default status;
