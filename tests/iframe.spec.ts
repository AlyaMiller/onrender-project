import { test, expect } from "../fixtures/navigated-page";
import IframePage from "../Pages/IframePage";

//-----------------Using frameLocator
test("verifying the confirmation of the click button", async ({
  navigatedPage,
  context,
}) => {
  const iframe = new IframePage(navigatedPage, context);
  await iframe.clickOnClickMeBtn();
  await expect(iframe.getIframeMessage()).toHaveText(
    "Button inside iframe clicked!",
  );
});

test("verifying filled input value", async ({ navigatedPage, context }) => {
  const iframe = new IframePage(navigatedPage, context);
  await iframe.typeMessage();
  await expect(iframe.getIframeMessage()).toHaveText(
    "You typed: Hello iframe! ",
  );
});

//---------------Using contentFrame()
test("using contentFrame() method", async ({ navigatedPage, context }) => {
  const iframe = new IframePage(navigatedPage, context);
  await iframe.usingContentFrame();
  await expect(iframe.getIframeMessage()).toHaveText(
    "You typed: Hello iframe! ",
  );
});
