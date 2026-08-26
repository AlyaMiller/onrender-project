import { test, expect } from "../fixtures/navigated-page";
import UploadDownloadPage from "../Pages/UploadDownloadPage";

//verify download
test("Downloading a single file", async ({ navigatedPage, context }) => {
  const singleFileDownload = new UploadDownloadPage(navigatedPage, context);
  await singleFileDownload.downloadedSingleFile();
  await expect(singleFileDownload.getDownloadedSingleFileMessage()).toHaveText(
    "Single file download initiated!",
  );
});

test("Downloading Multiple Files", async ({ navigatedPage, context }) => {
  const multipleFileDownload = new UploadDownloadPage(navigatedPage, context);
  await multipleFileDownload.downloadedMultipleFile();
  await expect(
    multipleFileDownload.getDownloadedMultipleFileMessage(),
  ).toHaveText("Three files downloaded!");
});
