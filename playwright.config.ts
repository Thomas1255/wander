import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "api",
      testMatch: "**/*.api.spec.ts",
    },
    {
      name: "desktop-chromium",
      testMatch: "**/*.browser.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      testMatch: "**/*.browser.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: `${baseURL}/api/health`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
