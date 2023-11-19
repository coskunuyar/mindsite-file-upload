import { render, fireEvent, screen } from "@testing-library/react";
import ServerUploadSuccessMessage from "./ServerUploadSuccessMessage";
import "@testing-library/jest-dom";

describe("ServerUploadSuccessMessage Component", () => {
  it("renders the success message and Upload More button", () => {
    const successMessage = "Upload successful.";
    const mockUploadMore = jest.fn();

    render(
      <ServerUploadSuccessMessage
        message={successMessage}
        onUploadMore={mockUploadMore}
      />
    );

    const successMessageText = screen.getByText(successMessage);
    expect(successMessageText).toBeInTheDocument();

    const uploadMoreButton = screen.getByText("Upload More");
    expect(uploadMoreButton).toBeInTheDocument();

    fireEvent.click(uploadMoreButton);
    expect(mockUploadMore).toHaveBeenCalled();
  });

  it("renders the success icon", () => {
    render(
      <ServerUploadSuccessMessage
        message="Upload successful."
        onUploadMore={() => {}}
      />
    );

    const successIcon = screen.getByTestId("success-icon");
    expect(successIcon).toBeInTheDocument();
  });
});
