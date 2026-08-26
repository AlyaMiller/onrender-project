import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class NewTab extends BasePage {
  async listeningForNewTab(locator: Locator) {
    const [newTab] = await Promise.all([
      //runs the listener
      this.context.waitForEvent("page"),
      //action(the clicks together, get back the raw new tab)
      locator.click(),
    ]);
    //then hand back that raw tab directly
    return new NewTab(newTab, this.context);
  }
  //builds and returns the locator
  getNewTabButton() {
    return this.page.getByRole("button", { name: "Open Page in New Tab" });
  }
  //builds and returns the locator
  getNewTabLink() {
    return this.page.getByRole("link", { name: "Example Website" });
  }

  async createNewPage() {
    //creates a blank tab
    const newPage = await this.context.newPage();
    //wraps that tab into a new NewTab instance
    const newTabInstance = new NewTab(newPage, this.context);
    //returns that instance instead of the raw tab
    return newTabInstance;
  }

  getPageTitleMessage() {
    return this.page.locator("#newTabTitle");
  }

  getTheSuccessMessage() {
    return this.page.getByText("New tab opened successfully");
  }
  async closeTheNewTab() {
    await this.page.close();
  }
}
