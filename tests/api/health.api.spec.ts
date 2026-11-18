import { expect, test } from "@playwright/test";

test("GET /api/health returns the application liveness contract", async ({
  request,
}) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(await response.json()).toEqual({ status: "ok", name: "Wander" });
});

test("POST /api/health rejects an unsupported method", async ({ request }) => {
  const response = await request.post("/api/health");

  expect(response.status()).toBe(405);
});
