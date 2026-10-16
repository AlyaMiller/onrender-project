import { test, expect } from "../fixtures/pages";

//----------------Test 1
//Catching a tab the page opens
test("opens a new tab", async ({ newTab, practisePage, context }) => {
  //wrapping the actual newly-opened tab
  const newTabPage = await newTab.listeningForNewTab(newTab.getNewTabButton()); //new tab
  //wait for the new tab to be ready
  await newTabPage.waitForPage();
  //verification
  await expect(newTabPage.getPageTitleMessage()).toHaveText(
    "Welcome to the New Tab",
  );
  //switches focus back to original tab
  await practisePage.backToOriginalTab();

  //Go back to original tab and verify it's still functional
  await expect(newTab.getTheSuccessMessage()).toBeVisible();

  //close the new tab
  await newTabPage.closeTheNewTab();
  await practisePage.clickLoadDataButton();
  await expect(practisePage.getDataLoadedMessage()).toBeVisible();
  expect(context.pages()).toHaveLength(1);
});

//----------------Test 2
//link triggers a new tab
test("getting a new page", async ({ newTab }) => {
  //the returned instance is captured,and every following check uses it
  const examplePage = await newTab.listeningForNewTab(newTab.getNewTabLink());
  //wait for the new tab to be ready
  await examplePage.waitForPage();
  //verification
  await expect(examplePage.page).toHaveURL("https://example.com/");
});

//----------------Test 3
//completely independent tab that has nothing to do with any page action
test("manually creating a new page", async ({ newTab }) => {
  const examplePage = await newTab.createNewPage();
  //examplePage is a NewTab class instance
  //examplePage.page reaches that raw Page
  await examplePage.page.goto("https://example.com/");
  await examplePage.page.waitForLoadState("domcontentloaded");
  await expect(examplePage.page).toHaveURL("https://example.com/");
});

//----------------Test 4
//Page reload
test("verifying the page reload", async ({ practisePage, navigatedPage }) => {
  await practisePage.clickTheCheckBox();
  await expect(practisePage.getCheckbox()).toBeChecked();
  await expect(practisePage.getCheckedCheckboxMessage()).toBeVisible();
  await navigatedPage.reload();
  await expect(practisePage.getCheckbox()).not.toBeChecked();
});
