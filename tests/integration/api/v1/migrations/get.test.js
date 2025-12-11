import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

beforeAll(cleanDatabase);

test("Migrations to /api/v1/status shold return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "GET",
  });

  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
