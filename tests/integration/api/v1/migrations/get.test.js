import database from "infra/database";
import orquestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("Migrations to /api/v1/status shold return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "GET",
  });

  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
