import { test, expect } from "../fixtures/pages";

//<input type="file">
test("Uploading a single file directly", async ({ uploadFile }) => {
  //page, context- that's BasePage's constructor, which every subclass inherits automatically

  await uploadFile.directSingleUpload();
  //verify the filename shows correctly
  await expect(uploadFile.getUploadedFileMessage()).toHaveText(
    "Selected files: test-file.pdf",
  );
});

//Upload multiple files at once to the same input
test("Uploading multiple files at once", async ({ uploadFile }) => {
  await uploadFile.directMultipleUpload();
  await expect(uploadFile.getUploadedFileMessage()).toHaveText(
    "Selected files: test-file.pdf, download.png",
  );
});

//the file-chooser-triggered upload
test("Verifying file-chooser-triggered upload", async ({ uploadFile }) => {
  await uploadFile.singleFileChooserUpload();
  await expect(uploadFile.getUploadedFileMessage()).toHaveText(
    "Selected files: download.png",
  );
});
