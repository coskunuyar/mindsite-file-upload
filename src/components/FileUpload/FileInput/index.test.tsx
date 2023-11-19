import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileInput from "./index";

describe("FileInput Component", () => {
  const mockHandleUpload = jest.fn();
  const mockOnFileInputChange = jest.fn();
  const mockRemoveFile = jest.fn();

  const sampleFiles = [
    new File(["sample content"], "file1.txt", { type: "text/plain" }),
    new File(["sample content"], "file2.txt", { type: "text/plain" }),
  ];

  beforeEach(() => {
    render(
      <FileInput
        handleUpload={mockHandleUpload}
        onFileInputChange={mockOnFileInputChange}
        selectedFiles={sampleFiles}
        removeFile={mockRemoveFile}
        browserUploadProgress={{
          "file1.txt": 100,
          "file2.txt": 100,
        }}
      />
    );
  });

  it("renders the Select Files button", () => {
    const selectFilesButton = screen.getByText("Select Files");
    expect(selectFilesButton).toBeInTheDocument();
  });

  it("calls onFileInputChange when the file input changes", () => {
    const fileInput = screen.getByTestId("file-upload-input");
    fireEvent.change(fileInput, {
      target: { files: sampleFiles },
    });
    expect(mockOnFileInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          files: sampleFiles,
        }),
      })
    );
  });

  it("renders the Submit button", () => {
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  it("calls handleUpload when the Submit button is clicked", () => {
    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(mockHandleUpload).toHaveBeenCalled();
  });

  it("renders the FileList component", () => {
    const fileList = screen.getByTestId("file-list");
    expect(fileList).toBeInTheDocument();
  });

  it("calls removeFile when the Remove button in FileList is clicked", () => {
    const removeButtons = screen.getAllByTestId("remove-file-button");
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFile).toHaveBeenCalledWith(0);
  });
});
