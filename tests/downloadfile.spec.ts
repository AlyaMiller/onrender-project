import { test, expect } from "../fixtures/pages";

//verify download
test(
  "Downloading a single file",
  { tag: "@smoke" },
  async ({ downloadFile }) => {
    await downloadFile.downloadedSingleFile();
    await expect(downloadFile.getDownloadedSingleFileMessage()).toHaveText(
      "Single file download initiated!",
    );
  },
);

test("Downloading Multiple Files", async ({ downloadFile }) => {
  await downloadFile.downloadedMultipleFile();
  await expect(downloadFile.getDownloadedMultipleFileMessage()).toHaveText(
    "Three files downloaded!",
  );
});
