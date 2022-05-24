import { render, screen } from "@testing-library/react";
import TopBar from "../../../components/TopBar";

describe("TopBar", () => {
  it("should render center court text", () => {
    render(<TopBar />);
    const centerCourtTextElement = screen.getByText(/Center court circle/i);

    expect(centerCourtTextElement).toBeInTheDocument();
    expect(centerCourtTextElement).toHaveTextContent("Center court circle");
  });

  it("should render border width text", () => {
    render(<TopBar />);
    const borderWidthTextElement = screen.getByText(/Border width/i);

    expect(borderWidthTextElement).toBeInTheDocument();
    expect(borderWidthTextElement).toHaveTextContent("Border width");
  });

  it("should render color select button", () => {
    render(<TopBar />);
    expect(screen.getByTestId("colorSelectBtn")).toBeTruthy();
  });

  it("should render center court icon", () => {
    render(<TopBar />);
    expect(screen.getByTestId("smallCourtIcon")).toBeTruthy();
  });

  it("should render upload image btn", () => {
    render(<TopBar />);
    expect(screen.getByTestId("uploadBtn")).toBeTruthy();
  });
});
