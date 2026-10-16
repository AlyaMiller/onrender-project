import { test, expect } from "../fixtures/pages";

test("verifying the popup window", async ({ popup }) => {
  //the main page instance
  //used more than once
  //popupText (the popup instance)
  const popupText = await popup.popupPage();
  //getPopupTitleMessage() returns locator
  await expect(popupText.getPopupTitleMessage()).toHaveText("Popup Page");
  //await wraps the whole expect(...).toHaveText() call
  //since the retrying only starts once toHaveText is attached
  //the locator alone doesn't wait for anything on its own
  await expect(popupText.getPopupBodyMessage()).toHaveText(
    "This is a popup window.",
  );
  await expect(popup.getPopupConfirmationMessage()).toHaveText(
    "Popup window opened successfully",
  );
  await popupText.closePopupWindow();
});
