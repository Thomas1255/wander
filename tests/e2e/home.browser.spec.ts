import { expect, test } from "@playwright/test";

test("loads Wander's foundation page without browser errors", async ({
  page,
}) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Wander");
  await expect(
    page.getByRole("heading", { level: 1, name: "Wander", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Phase 0");
  expect(browserErrors).toEqual([]);
});
