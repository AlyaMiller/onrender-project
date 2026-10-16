import { test, expect } from "../fixtures/pages";

test.describe("testing dialogs", { tag: "@regression" }, () => {
  test("verifying the alert dialog", async ({ alert }) => {
    expect(await alert.alerts()).toBe("Hello! This is a simple alert dialog.");
  });

  test("verifying the prompt value", async ({ prompt }) => {
    expect(await prompt.prompt()).toBe("Please enter your name:");
    await expect(prompt.getPromptMessage()).toHaveText("Hello, Albina");
  });

  test("verifying the confirm dialog", async ({ confirm }) => {
    //the dialog's own message text
    //.toBe for plain values
    expect(await confirm.confirm("accept")).toBe("Do you want to continue?");
    //the page's resulting text afterward
    //.toHaveText for locator
    await expect(confirm.getConfirmMessage()).toHaveText("Accepted");
  });

  test("verifying the dismiss dialog", async ({ confirm }) => {
    //the dialog's own message text
    expect(await confirm.confirm("dismiss")).toBe("Do you want to continue?");
    //the page's resulting text afterward
    await expect(confirm.getConfirmMessage()).toHaveText("Cancelled");
  });
});
