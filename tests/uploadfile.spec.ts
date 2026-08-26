import { test, expect } from "../fixtures/navigated-page";
import UploadDownloadPage from "../Pages/UploadDownloadPage";

//<input type="file">
test("Uploading a single file directly", async ({ navigatedPage, context }) => {
  //page, context- that's BasePage's constructor, which every subclass inherits automatically
  const singleFileUpload = new UploadDownloadPage(navigatedPage, context);
  await singleFileUpload.directSingleUpload();
  //verify the filename shows correctly
  await expect(singleFileUpload.getUploadedFileMessage()).toHaveText(
    "Selected files: test-file.pdf",
  );
});

//Upload multiple files at once to the same input
test("Uploading multiple files at once", async ({ navigatedPage, context }) => {
  const multipleFileUpload = new UploadDownloadPage(navigatedPage, context);
  await multipleFileUpload.directMultipleUpload();
  await expect(multipleFileUpload.getUploadedFileMessage()).toHaveText(
    "Selected files: test-file.pdf, download.png",
  );
});

//the file-chooser-triggered upload
test("Verifying file-chooser-triggered upload", async ({
  navigatedPage,
  context,
}) => {
  const fileChooserUpload = new UploadDownloadPage(navigatedPage, context);
  await fileChooserUpload.singleFileChooserUpload();
  await expect(fileChooserUpload.getUploadedFileMessage()).toHaveText(
    "Selected files: download.png",
  );
});
