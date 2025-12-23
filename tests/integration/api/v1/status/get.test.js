import orquestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
});

test("GET to /api/v1/status shold return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  const parseUpdatedAt = new Date(responseBody.update_At).toISOString();
  expect(responseBody.update_At).toEqual(parseUpdatedAt);
  expect(responseBody.dependecies.database.version).toEqual("16.0");
  expect(responseBody.dependecies.database.max_connections).toEqual(100);
  expect(responseBody.dependecies.database.resultActiveConns).toBe(1);
});
