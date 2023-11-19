import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileList from "./FileList";

URL.createObjectURL = jest.fn();

describe("FileList Component Tests", () => {
  it("renders correctly when files are selected", () => {
    const selectedFiles = [
      new File(["file1 content"], "file1.txt", { type: "text/plain" }),
      new File(["image content"], "image.jpg", { type: "image/jpeg" }),
    ];

    render(
      <FileList
        selectedFiles={selectedFiles}
        isUploadingToServer={false}
        removeFile={() => {}}
        browserUploadProgress={{}}
      />
    );

    const fileListItems = screen.getAllByRole("listitem");
    expect(fileListItems.length).toBe(selectedFiles.length);

    const textFile = selectedFiles[0];
    const fileNameElement = screen.getByText(textFile.name);

    const imageFile = selectedFiles[1];
    const fileImageElement = screen.getByAltText(imageFile.name);

    expect(fileNameElement).toBeInTheDocument();
    expect(fileImageElement).toBeInTheDocument();
  });

  it("handles file removal", () => {
    const selectedFiles = [
      new File(["file1 content"], "file1.txt", { type: "text/plain" }),
      new File(["image content"], "image.jpg", { type: "image/jpeg" }),
    ];
    const removeFileMock = jest.fn();

    render(
      <FileList
        selectedFiles={selectedFiles}
        isUploadingToServer={false}
        removeFile={removeFileMock}
        browserUploadProgress={{}}
      />
    );

    const removeButtons = screen.getAllByTestId("remove-file-button");

    expect(removeButtons.length).toBe(selectedFiles.length);

    fireEvent.click(removeButtons[0]);

    expect(removeFileMock).toHaveBeenCalledWith(0);
  });

  it("renders file progress when uploading", () => {
    const selectedFiles = [
      new File(["file1 content"], "file1.txt", { type: "text/plain" }),
    ];
    const browserUploadProgress = {
      "file1.txt": 50,
    };

    render(
      <FileList
        selectedFiles={selectedFiles}
        isUploadingToServer={true}
        removeFile={() => {}}
        browserUploadProgress={browserUploadProgress}
      />
    );

    const progressText = screen.getByText("50%");
    expect(progressText).toBeInTheDocument();
  });
});
