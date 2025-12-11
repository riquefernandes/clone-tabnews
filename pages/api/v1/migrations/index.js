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
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigration = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    if (migratedMigration.length > 0) {
      return response.status(201).json(migratedMigration);
    }

    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}

export default status;
