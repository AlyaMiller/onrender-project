import BasePage from "./BasePage";

export default class IframePage extends BasePage {
  //first have to tell Playwright "step into that specific rectangle"
  //iframe- class filed, class property
  iframe = this.page.frameLocator("#practiceIframe");

  async clickOnClickMeBtn() {
    await this.iframe.getByRole("button", { name: "Click Me" }).click();
  }

  getIframeMessage() {
    return this.iframe.locator("#iframeOutput");
  }

  async typeMessage() {
    await this.iframe.getByPlaceholder("Type here...").fill("Hello iframe!");
  }

  async usingContentFrame() {
    //returns Promise, it needs await
    const contentFrame = this.page.locator("#practiceIframe").contentFrame();
    await contentFrame.getByPlaceholder("Type here...").fill("Hello iframe!");
  }
}
