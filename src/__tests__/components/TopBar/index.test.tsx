import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import renderWithMockedProvider from "../../utils";

describe("TopBar", () => {
  it("should render court name", () => {
    renderWithMockedProvider(<TopBar />);
  });

  it("should render width text", () => {
    renderWithMockedProvider(<TopBar />);
    const borderWidthTextElement = screen.getByText(/width/i);

    expect(borderWidthTextElement).toBeInTheDocument();
    expect(borderWidthTextElement).toHaveTextContent("width");
  });

  it("should render color select button", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("colorSelectBtn")).toBeTruthy();
  });

  it("should render upload image btn", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("uploadBtn")).toBeTruthy();
  });

  it("Should render Share button", () => {
    renderWithMockedProvider(<TopBar />);

    const downloadButton = screen.getByTestId("download-btn");
    expect(downloadButton).toBeInTheDocument();
  });

});
