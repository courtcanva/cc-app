import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";

describe("TopBar", () => {
  it("should render center court text", () => {
    render(<TopBar />);
    const centerCourtTextElement = screen.getByText(/Center court circle/i);

    expect(centerCourtTextElement).toBeInTheDocument();
    expect(centerCourtTextElement).toHaveTextContent("Center court circle");
  });

  it("should render width text", () => {
    render(<TopBar />);
    const borderWidthTextElement = screen.getByText(/width/i);

    expect(borderWidthTextElement).toBeInTheDocument();
    expect(borderWidthTextElement).toHaveTextContent("width");
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

  it("Should render Share button", () => {
    render(<TopBar />);

    const downloadButton = screen.getByTestId("download-btn");
    expect(downloadButton).toBeInTheDocument();
  });

  it("Should render login Modal when click button", async () => {
    render(<TopBar />);
    const downloadButton = screen.getByTestId("download-btn");
    fireEvent.click(downloadButton);
    const loginModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(loginModalDialog).toBeVisible());
  });
});
