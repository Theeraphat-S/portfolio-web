import { expect, test } from "@playwright/test";

test("remembers visual identity independently of live system color changes", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const selector = page.getByRole("combobox", { name: "รูปแบบภาพ" });
  await expect(selector).toHaveValue("original");
  await expect(page.locator(".space-horizon")).toHaveCount(0);
  await selector.selectOption("space");
  await expect(page.locator(".space-horizon img")).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await page.reload();
  await expect(selector).toHaveValue("space");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect(selector).toHaveValue("space");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await selector.selectOption("original");
  await page.reload();
  await expect(selector).toHaveValue("original");
});

test("preserves form content and scroll position when switching", async ({
  page,
}) => {
  await page.goto("/");
  const name = page.locator('input[type="text"]').first();
  await name.fill("Oven theme check");
  // Wait for Lenis smooth-scroll to fully settle
  await page.waitForFunction(
    () => {
      const lenis = (
        window as unknown as { __lenis?: { isScrolling: boolean } }
      ).__lenis;
      return lenis
        ? !lenis.isScrolling && window.scrollY > 1000
        : window.scrollY > 1000;
    },
    { timeout: 5000 },
  );

  const before = await page.evaluate(() => window.scrollY);
  await page.getByRole("combobox").selectOption("space");
  await expect(name).toHaveValue("Oven theme check");
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => window.scrollY)) - before),
    )
    .toBeLessThan(3);
});

test("mobile selector supports both languages and keyboard selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const selector = page.getByRole("combobox");
  await expect(selector).toBeInViewport();
  await page.getByRole("button", { name: "Language switch" }).click();
  await expect(selector).toHaveAccessibleName("Visual theme");
  await selector.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(selector).toHaveValue("space");
  await page.getByRole("button", { name: "Toggle Mobile Menu" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
});

test("reduced motion disables space animation and parallax", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("combobox").selectOption("space");
  await expect(page.locator(".space-horizon img")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".space-horizon")).toHaveCSS("transform", "none");
  expect(
    await page
      .locator(".space-stars")
      .evaluate(
        (element) => getComputedStyle(element, "::before").animationName,
      ),
  ).toBe("none");
});

test("invalid saved choice falls back and blocked theme writes remain usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-visual-theme", "unknown");
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "portfolio-visual-theme")
        throw new DOMException("Blocked", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await page.goto("/");
  await expect(page.getByRole("combobox")).toHaveValue("original");
  await page.getByRole("combobox").selectOption("space");
  await expect(page.locator(".space-horizon")).toBeVisible();
});
