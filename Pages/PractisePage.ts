import BasePage from "./BasePage";

export default class PractisePage extends BasePage {
  async clickLoadDataButton() {
    await this.clickElement(
      this.page.getByRole("button", { name: "Load Data" }),
    );
  }

  getDataLoadedMessage() {
    return this.getMessage("Data loaded successfully!");
  }
  async clickTheCheckBox() {
    await this.clickElement(
      this.page.getByRole("checkbox", { name: "Option 1" }),
    );
  }

  getCheckedCheckboxMessage() {
    return this.getMessage("Checked: Option 1");
  }

  getCheckbox() {
    return this.getElement(
      this.page.getByRole("checkbox", { name: "Option 1" }),
    );
  }
}
