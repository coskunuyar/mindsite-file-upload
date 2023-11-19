import { render, fireEvent, screen } from "@testing-library/react";
import ServerUploadProgress from "./index";
import "@testing-library/jest-dom";

describe("ServerUploadProgress Component", () => {
  it("does not render anything when uploadProgress is undefined / renders when 0", () => {
    const mockCancelUpload = jest.fn();

    render(<ServerUploadProgress cancelUpload={mockCancelUpload} />);
    expect(
      screen.queryByTestId("linear-progress-with-label")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();

    render(
      <ServerUploadProgress
        uploadProgress={0}
        cancelUpload={mockCancelUpload}
      />
    );
    expect(
      screen.queryByTestId("linear-progress-with-label")
    ).toBeInTheDocument();
    expect(screen.queryByText("Cancel")).toBeInTheDocument();
  });

  it("renders LinearProgressWithLabel and Cancel button when uploadProgress is greater than / equal 0", () => {
    const uploadProgress = 50;
    const mockCancelUpload = jest.fn();

    render(
      <ServerUploadProgress
        uploadProgress={uploadProgress}
        cancelUpload={mockCancelUpload}
      />
    );

    const linearProgressWithLabel = screen.getByTestId(
      "linear-progress-with-label"
    );
    expect(linearProgressWithLabel).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockCancelUpload).toHaveBeenCalled();
  });
});
