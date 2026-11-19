import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const screens = [
  { name: "landing", path: "/" },
  { name: "trips", path: "/trips" },
  { name: "empty collection", path: "/trips?view=empty" },
  { name: "loading collection", path: "/trips?view=loading" },
];

test("shows the destination and one direct hero action without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Wander");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  await expect(
    hero.getByRole("heading", { level: 1, name: "Japan", exact: true }),
  ).toBeVisible();
  await expect(hero.getByText("Tokyo", { exact: true })).toBeVisible();
  await expect(
    hero.getByText("Tokyo Tower, Senso-ji, and Shinjuku after dark.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(hero.getByRole("link")).toHaveCount(1);
  const tripLink = hero.getByRole("link", {
    name: "View sample trip",
    exact: true,
  });
  await expect(tripLink).toHaveAttribute("href", "/trips#tokyo");
  await expect
    .poll(() =>
      hero
        .getByRole("img", {
          name: "Tokyo Tower glowing above the city at dusk",
        })
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await tripLink.click();
  await expect(page).toHaveURL(/\/trips#tokyo$/);
  await expect(
    page.getByRole("article", { name: "Tokyo", exact: true }),
  ).toBeInViewport();
  expect(errors).toEqual([]);
});

test("the opening uses cinematic proportions and leads directly to destinations", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1900, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByText(/A shared plan\./)).toHaveCount(0);
    const header = await page.getByRole("banner").boundingBox();
    const hero = await page
      .getByRole("region", { name: "Featured destinations" })
      .boundingBox();
    const destinations = await page
      .getByRole("region", { name: "Where to next?", exact: true })
      .boundingBox();
    if (!header || !hero || !destinations)
      throw new Error("The opening and destinations must be rendered.");
    expect(hero.y).toBe(0);
    expect(header.y).toBe(0);
    expect(header.y + header.height).toBeLessThan(hero.y + hero.height);
    expect(hero.y + hero.height).toBeLessThan(viewport.height);
    if (viewport.width >= 1440) {
      // The banner shows a taller scenic crop, close to the approved 2:1 reference.
      expect(hero.width / hero.height).toBeGreaterThan(2);
      expect(hero.width / hero.height).toBeLessThan(2.1);
    }
    expect(destinations.y).toBeCloseTo(hero.y + hero.height, 0);
    await expect(
      page.getByRole("link", { name: "View sample trip", exact: true }),
    ).toBeInViewport();
  }
});

test("transparent landing navigation keeps trip content clear after route changes", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  const bounds = await header.boundingBox();
  if (!bounds) throw new Error("The navigation must be rendered.");
  // The photo reaches the top and its visible header controls remain clickable.
  expect((await hero.boundingBox())?.y).toBe(0);
  await expect(
    header.getByRole("link", { name: "Wander home" }),
  ).toBeInViewport();

  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Your trips" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Your trips" })
      .click();
  }
  await expect(page).toHaveURL(/\/trips$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const tripHeader = await header.boundingBox();
  const content = await page.getByRole("main").boundingBox();
  if (!tripHeader || !content)
    throw new Error("The trip layout must be rendered.");
  expect(content.y).toBeGreaterThanOrEqual(tripHeader.y + tripHeader.height);

  await header.getByRole("link", { name: "Wander home" }).click();
  await expect(hero).toBeVisible();
  expect((await hero.boundingBox())?.y).toBe(0);
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("navigation follows scrolling and stays transparent", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await hero.evaluate((element) =>
    window.scrollTo({ top: element.clientHeight + 180, behavior: "instant" }),
  );
  await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header).toHaveCSS("backdrop-filter", "none");
  await expect(
    header.getByRole("link", { name: "Wander home" }),
  ).toBeInViewport();
  const accessibility = await new AxeBuilder({ page })
    .include(".site-header")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);

  if (isMobile) {
    const trigger = header.getByRole("button", { name: "Open navigation" });
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(trigger).toBeInViewport();
    await trigger.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Your trips" })
      .click();
  } else {
    await header.getByRole("link", { name: "Your trips" }).click();
  }
  await expect(page).toHaveURL(/\/trips$/);
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);

  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header).toHaveCSS("backdrop-filter", "none");
  await header.getByRole("link", { name: "Wander home" }).click();
  await expect(hero).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  expect((await hero.boundingBox())?.y).toBe(0);
});

test("carousel arrows wrap and direct selection updates the destination and trip", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  const next = hero.getByRole("button", { name: "Next destination" });
  const previous = hero.getByRole("button", { name: "Previous destination" });
  const heading = hero.getByRole("heading", { level: 1 });
  await expect(heading).toHaveCount(1);

  for (const country of ["Greece", "Iceland", "Japan"]) {
    await next.click();
    await expect(heading).toHaveText(country);
    await expect(
      hero.getByRole("button", { name: country, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(hero.getByRole("button", { pressed: true })).toHaveCount(1);
    await expect(hero.getByRole("img")).toHaveCount(1);
  }
  await previous.click();
  await expect(heading).toHaveText("Iceland");

  for (const destination of [
    { country: "Greece", location: "Santorini", id: "santorini" },
    { country: "Japan", location: "Tokyo", id: "tokyo" },
    { country: "Iceland", location: "South Coast", id: "iceland" },
  ]) {
    await hero
      .getByRole("button", { name: destination.country, exact: true })
      .click();
    await expect(heading).toHaveText(destination.country);
    await expect(
      hero.getByText(destination.location, { exact: true }),
    ).toBeVisible();
    await expect(
      hero.getByRole("link", { name: "View sample trip" }),
    ).toHaveAttribute("href", `/trips#${destination.id}`);
  }
  await hero.getByRole("link", { name: "View sample trip" }).click();
  await expect(page).toHaveURL(/\/trips#iceland$/);
  await expect(
    page.getByRole("article", { name: "Iceland", exact: true }),
  ).toBeInViewport();
});

test("carousel controls work with the keyboard and retain focus on activation", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  await hero.getByRole("link", { name: "View sample trip" }).focus();
  for (const country of ["Japan", "Greece", "Iceland"]) {
    await page.keyboard.press("Tab");
    const selector = hero.getByRole("button", { name: country, exact: true });
    await expect(selector).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(hero.getByRole("heading", { level: 1 })).toHaveText(country);
    await expect(selector).toBeFocused();
  }
  await page.keyboard.press("Tab");
  await expect(
    hero.getByRole("button", { name: "Previous destination" }),
  ).toBeFocused();
  await page.keyboard.press("Space");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Greece");
  await page.keyboard.press("Tab");
  const next = hero.getByRole("button", { name: "Next destination" });
  await expect(next).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Iceland");
  await expect(next).toBeFocused();
});

test("touch swipes change destinations while vertical gestures preserve the slide", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  // Real Chromium touch input exercises pointer cancellation and touch-action.
  const touch = await context.newCDPSession(page);
  const box = await hero.boundingBox();
  const header = await page.getByRole("banner").boundingBox();
  if (!box || !header)
    throw new Error(
      "The destination carousel and navigation must be rendered.",
    );
  const x = box.x + box.width * 0.75;
  const y = Math.max(box.y + 70, header.y + header.height + 40);
  async function swipe(deltaX: number, deltaY: number) {
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + deltaX, y: y + deltaY }],
    });
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  }
  await swipe(-box.width * 0.5, 8);
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Greece");
  await swipe(8, -80);
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Greece");
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await touch.detach();
});

test("reduced motion switches the destination without a crossfade", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  await hero.getByRole("button", { name: "Greece", exact: true }).click();
  const styles = await hero.getByRole("img").evaluate((image) => ({
    transition: getComputedStyle(image).transitionDuration,
    opacity: getComputedStyle(image).opacity,
  }));
  expect(styles).toEqual({ transition: "0s", opacity: "1" });
});

test("alternate destination slides pass basic accessibility checks", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured destinations" });
  for (const country of ["Greece", "Iceland"]) {
    await hero.getByRole("button", { name: country, exact: true }).click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, country).toEqual([]);
  }
});

test("main navigation reaches the sample collection", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeHidden();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Your trips" })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();
  } else {
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeHidden();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Your trips" })
      .click();
  }
  await expect(page).toHaveURL(/\/trips$/);
  await expect(page).toHaveTitle("Your trips — Wander");
  await expect(
    page.getByRole("heading", { level: 1, name: /Your next/ }),
  ).toBeVisible();
  await expect(
    page.getByText("All trips and travelers are examples."),
  ).toBeVisible();
  await expect(page.locator("main article")).toHaveCount(3);
  for (const city of ["Tokyo", "Santorini", "Iceland"]) {
    await expect(
      page.getByRole("heading", { level: 3, name: city, exact: true }),
    ).toBeVisible();
  }
});

test("destination cards navigate to their corresponding sample trip", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "See Iceland sample trip" }).click();
  await expect(page).toHaveURL(/\/trips#iceland$/);
  const destination = page.getByRole("article", { name: "Iceland" });
  await expect(destination).toBeInViewport();
  const header = await page.getByRole("banner").boundingBox();
  const target = await destination.boundingBox();
  if (!header || !target)
    throw new Error("The header and trip must be rendered.");
  expect(target.y).toBeGreaterThanOrEqual(header.y + header.height);
});

test("empty and loading previews preserve navigation back to sample trips", async ({
  page,
}) => {
  await page.goto("/trips");
  const preview = page.getByRole("navigation", { name: "Collection preview" });
  await preview.getByRole("link", { name: "No trips", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A whole world ahead." }),
  ).toBeVisible();
  await expect(page.locator("main article")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Explore sample trips", exact: true })
    .click();
  await expect(page.locator("main article")).toHaveCount(3);
  await preview.getByRole("link", { name: "Loading", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Loading trips.");
  await expect(
    page.getByRole("region", { name: "Trip collection loading" }),
  ).toHaveAttribute("aria-busy", "true");
  await preview.getByRole("link", { name: "With trips", exact: true }).click();
  await expect(page.locator("main article")).toHaveCount(3);
});

test("skip navigation and the main menu work entirely with the keyboard", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  await page.goto("/");
  await page.keyboard.press("Tab"); // Skip link.
  await page.keyboard.press("Tab"); // Wordmark.
  await page.keyboard.press("Tab");
  if (isMobile) {
    const trigger = page.getByRole("button", { name: "Open navigation" });
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Enter");
    const close = page.getByRole("button", { name: "Close navigation" });
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Destinations" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab"); // Discover.
    await page.keyboard.press("Tab"); // Your trips.
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Your trips" }),
    ).toBeFocused();
  } else {
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Discover" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Your trips" }),
    ).toBeFocused();
  }
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/trips$/);
});

test("photography credits can be expanded with the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const disclosure = page.locator("summary");
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("link", { name: /Tokyo · Louie Martinez/ }),
  ).toBeVisible();
});

test("screens fit phone, tablet, and desktop widths without horizontal scrolling", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const screen of screens) {
      await page.goto(screen.path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(
        dimensions.content,
        `${screen.name} at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test("reduced-motion preference removes skeleton animation and smooth scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trips?view=loading");
  const styles = await page
    .locator(".skeleton")
    .first()
    .evaluate((element) => ({
      animation: getComputedStyle(element).animationName,
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
    }));
  expect(styles).toEqual({ animation: "none", scroll: "auto" });
});

for (const screen of screens) {
  test(`${screen.name} passes basic automated accessibility checks`, async ({
    page,
  }) => {
    await page.goto(screen.path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("mobile navigation has accessible dialog semantics", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("dialog", { name: "A little exploration" }),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
