import { Page, BrowserContext, Locator } from "@playwright/test";

export default class BasePage {
  page: Page; //anything: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    //constructor(anything: Page)
    this.page = page; //this.page = anything;
    this.context = context;
  }

  //it's original page
  async waitForPage() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async backToOriginalTab() {
    await this.page.bringToFront();
  }

  async clickElement(locator: Locator) {
    await locator.click();
  }

  getMessage(string: string) {
    return this.page.getByText(string);
  }

  getElement(locator: Locator) {
    return locator;
  }

  async fileUpload(filename: string[]) {
    await this.page.setInputFiles("#fileUpload", filename);
  }
}
