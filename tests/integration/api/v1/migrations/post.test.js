import database from "infra/database";
import orquestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("Post migrations to /api/v1/status shold return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);
  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);
});
