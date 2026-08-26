import { test, expect } from "../fixtures/navigated-page";
import NewTab from "../Pages/NewTabPage";
import PractisePage from "../Pages/PractisePage";

//----------------Test 1
//Catching a tab the page opens
test("opens a new tab", async ({ navigatedPage, context }) => {
  const mainPage = new NewTab(navigatedPage, context); //original page
  const newTab = await mainPage.listeningForNewTab(mainPage.getNewTabButton()); //new tab
  //wait for the new tab to be ready
  await newTab.waitForPage();
  //verification
  await expect(newTab.getPageTitleMessage()).toHaveText(
    "Welcome to the New Tab",
  );
  //switches focus back to original tab
  await mainPage.backToOriginalTab();

  //Go back to original tab and verify it's still functional
  await expect(mainPage.getTheSuccessMessage()).toBeVisible();

  //close the new tab
  await newTab.closeTheNewTab();
  const practisePage = new PractisePage(navigatedPage, context);
  await practisePage.clickLoadDataButton();
  await expect(practisePage.getDataLoadedMessage()).toBeVisible();
  expect(context.pages()).toHaveLength(1);
});

//----------------Test 2
//link triggers a new tab
test("getting a new page", async ({ navigatedPage, context }) => {
  const mainPage = new NewTab(navigatedPage, context);
  //manually creating a blank tab, no click
  const newTab = await mainPage.listeningForNewTab(mainPage.getNewTabLink());
  //wait for the new tab to be ready
  await newTab.waitForPage();
  //verification
  await expect(newTab.page).toHaveURL("https://example.com/");
});

//----------------Test 3
//completely independent tab that has nothing to do with any page action
test("manually creating a new page", async ({ navigatedPage, context }) => {
  //gives a blank tab
  const newTab = new NewTab(navigatedPage, context);
  //sends that blank tab somewhere
  const examplePage = await newTab.createNewPage();
  //examplePage is a NewTab class instance
  //examplePage.page reaches that raw Page
  await examplePage.page.goto("https://example.com/");
  await examplePage.page.waitForLoadState("domcontentloaded");
  await expect(examplePage.page).toHaveURL("https://example.com/");
});

//----------------Test 4
//Page reload
test("verifying the page reload", async ({ navigatedPage, context }) => {
  const practisePage = new PractisePage(navigatedPage, context);
  await practisePage.clickTheCheckBox();
  await expect(practisePage.getCheckbox()).toBeChecked();
  await expect(practisePage.getCheckedCheckboxMessage()).toBeVisible();
  await navigatedPage.reload();
  await expect(practisePage.getCheckbox()).not.toBeChecked();
});
