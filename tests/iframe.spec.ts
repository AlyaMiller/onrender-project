import { test, expect } from "../fixtures/pages";

//-----------------Using frameLocator
test(
  "verifying the confirmation of the click button",
  { tag: "@smoke" },
  async ({ iframe }) => {
    await iframe.clickOnClickMeBtn();
    await expect(iframe.getIframeMessage()).toHaveText(
      "Button inside iframe clicked!",
    );
  },
);

test("verifying filled input value", { tag: "@smoke" }, async ({ iframe }) => {
  await iframe.typeMessage();
  await expect(iframe.getIframeMessage()).toHaveText(
    "You typed: Hello iframe! ",
  );
});

//---------------Using contentFrame()
test("using contentFrame() method", async ({ iframe }) => {
  await iframe.usingContentFrame();
  await expect(iframe.getIframeMessage()).toHaveText(
    "You typed: Hello iframe! ",
  );
});
