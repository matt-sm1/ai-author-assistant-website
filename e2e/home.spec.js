import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("has brand logo, one h1, and hero CTA to #contact", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByAltText(/author ai assistant/i).first()).toBeVisible();

    const headings = page.locator("h1");
    await expect(headings).toHaveCount(1);

    const cta = page.getByRole("link", { name: /get in touch/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#contact");
  });
});
