import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function status(request, response) {
  const defaultMigrationsOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (request.method === "GET") {
    const migrations = await migrationRunner(defaultMigrationsOptions);
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    console.log("entrou no post");
    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}

export default status;
