import { render, fireEvent, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";
import "@testing-library/jest-dom";

describe("ErrorMessage Component", () => {
  it("renders the error message and Try Again button", () => {
    const errorMessage = "An error occurred.";
    const mockTryAgain = jest.fn();

    render(<ErrorMessage message={errorMessage} onTryAgain={mockTryAgain} />);

    const errorMessageText = screen.getByText(errorMessage);
    expect(errorMessageText).toBeInTheDocument();

    const tryAgainButton = screen.getByText("Try Again");
    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);
    expect(mockTryAgain).toHaveBeenCalled();
  });

  it("renders the error icon", () => {
    render(<ErrorMessage message="An error occurred." onTryAgain={() => {}} />);

    const errorIcon = screen.getByTestId("error-icon");
    expect(errorIcon).toBeInTheDocument();
  });
});
