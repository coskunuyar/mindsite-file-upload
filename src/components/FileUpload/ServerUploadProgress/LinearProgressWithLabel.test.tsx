import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

describe("LinearProgressWithLabel Component", () => {
  it("renders LinearProgress when value is 100", () => {
    const { container } = render(<LinearProgressWithLabel value={100} />);

    const linearProgress = container.querySelector(".MuiLinearProgress-root");
    expect(linearProgress).toBeInTheDocument();
  });

  it("renders LinearProgress variant='determinate' when value is not 100", () => {
    const { container } = render(<LinearProgressWithLabel value={50} />);

    const linearProgress = container.querySelector(".MuiLinearProgress-root");
    const determinateVariant = container.querySelector(
      ".MuiLinearProgress-determinate"
    );
    expect(linearProgress).toBeInTheDocument();
    expect(determinateVariant).toBeInTheDocument();
  });

  it("renders the percentage text", () => {
    render(<LinearProgressWithLabel value={75} />);

    const percentageText = screen.getByText("75%");
    expect(percentageText).toBeInTheDocument();
  });
});
