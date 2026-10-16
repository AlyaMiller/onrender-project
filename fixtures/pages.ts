import { test as base } from "@playwright/test";
import type { BrowserContext, Page } from "@playwright/test";
import UploadDownloadPage from "../Pages/UploadDownloadPage";
import NewTabPage from "../Pages/NewTabPage";
import IframePage from "../Pages/IframePage";
import PopupsAlertsPage from "../Pages/PopupsAlertsPage";
import PractisePage from "../Pages/PractisePage";
export { expect } from "@playwright/test";

//name and type
type MainPage = {
  navigatedPage: Page;
  downloadFile: UploadDownloadPage;
  uploadFile: UploadDownloadPage;
  newTab: NewTabPage;
  iframe: IframePage;
  popup: PopupsAlertsPage;
  alert: PopupsAlertsPage;
  prompt: PopupsAlertsPage;
  confirm: PopupsAlertsPage;
  practisePage: PractisePage;
};

async function dialogs(page: Page, context: BrowserContext) {
  await page.goto("https://selectors-practice.onrender.com/");
  return new PopupsAlertsPage(page, context);
}

async function uploadDownloadPage(page: Page, context: BrowserContext) {
  await page.goto("https://selectors-practice.onrender.com/");
  return new UploadDownloadPage(page, context);
}

export const test = base.extend<MainPage>({
  //the function that builds and returns it
  navigatedPage: async ({ page }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    await use(page);
  },

  downloadFile: async ({ page, context }, use) => {
    await use(await uploadDownloadPage(page, context));
  },

  uploadFile: async ({ page, context }, use) => {
    await use(await uploadDownloadPage(page, context));
  },

  newTab: async ({ page, context }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    const newTabPage = new NewTabPage(page, context);
    await use(newTabPage);
  },

  iframe: async ({ page, context }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    const iframePage = new IframePage(page, context);
    await use(iframePage);
  },

  popup: async ({ page, context }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    const popupsAlertsPage = new PopupsAlertsPage(page, context);
    await use(popupsAlertsPage);
  },

  alert: async ({ page, context }, use) => {
    await use(await dialogs(page, context));
  },

  prompt: async ({ page, context }, use) => {
    await use(await dialogs(page, context));
  },

  confirm: async ({ page, context }, use) => {
    await use(await dialogs(page, context));
  },

  practisePage: async ({ page, context }, use) => {
    await page.goto("https://selectors-practice.onrender.com/");
    const practisePage = new PractisePage(page, context);
    await use(practisePage);
  },
});
