import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
export { expect } from "@playwright/test";

type MainPage = { navigatedPage: Page };

export const test = base.extend<MainPage>({
  navigatedPage: async ({ page }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    await use(page);
  },
});
