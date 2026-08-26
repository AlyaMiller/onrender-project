import { Locator } from "@playwright/test";
import PractisePage from "./PractisePage";

export default class UploadDownloadPage extends PractisePage {
  //--------------------Upload
  //set the file on the input directly
  async directSingleUpload() {
    await this.fileUpload(["test-files/test-file.pdf"]);
  }

  getUploadedFileMessage() {
    return this.page.locator("#uploadOutput");
  }

  async directMultipleUpload() {
    await this.fileUpload([
      "test-files/test-file.pdf",
      "test-files/download.png",
    ]);
  }
  //async -because this method contains real browser actions that take time
  //because the file varies
  async fileChooserUpload(filename: string) {
    //two things need to start together
    //watching for the file-chooser dialog to appear, and the click that causes it to appear
    const [fileChooser] = await Promise.all([
      //Listener
      //it needs to be listened for before it happens, not checked for afterward
      this.page.waitForEvent("filechooser"),
      //action
      this.page.click("#fileUpload"),
    ]);
    //it has its own method, setFiles(...)
    //It needs await because supplying/uploading the file takes real time
    await fileChooser.setFiles(filename);
  }

  async singleFileChooserUpload() {
    await this.fileChooserUpload("test-files/download.png");
  }

  //--------------------Download
  //can reuse it for a different download later just by passing a different path
  async fileDownload(filename: string, locator: Locator) {
    const [fileDownload] = await Promise.all([
      //listen for download
      this.page.waitForEvent("download"),
      locator.click(),
    ]);
    //save downloaded file
    await fileDownload.saveAs(filename);
  }

  getDownloadSingleFileBtn() {
    return this.page.getByRole("button", { name: "Download Single File" });
  }

  getDownloadMultipleFileBtn() {
    return this.page.getByRole("button", { name: "Download Multiple Files" });
  }

  async downloadedSingleFile() {
    await this.fileDownload(
      "downloads/test.pdf",
      this.getDownloadSingleFileBtn(),
    );
  }

  getDownloadedSingleFileMessage() {
    return this.page.locator("#singleDownloadOutput");
  }

  async downloadedMultipleFile() {
    await this.fileDownload(
      "downloads/test.pdf",
      this.getDownloadMultipleFileBtn(),
    );
  }

  getDownloadedMultipleFileMessage() {
    return this.page.locator("#multiDownloadOutput");
  }
}
