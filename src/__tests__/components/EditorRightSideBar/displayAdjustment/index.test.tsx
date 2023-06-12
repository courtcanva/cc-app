import { fireEvent, screen } from "@testing-library/react";
import DisplayAdjustment from "@/components/EditorRightSideBar/DisplayAdjustment";
import renderWithMockedProvider from "../../../utils";

describe("EditorFooter", () => {
  it("should see the switch button", () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const switchButton = screen.getByTestId("switch-btn");
    expect(switchButton).toBeInTheDocument();
  });

  it("should render zoom scale percentage information", () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomScale = screen.getByText("100 %");
    expect(zoomScale).toBeVisible();
  });

  it("Each button in the navbar needs to display the correct text", () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutElement = screen.getByTestId("zoom-out-btn");
    const zoomInElement = screen.getByTestId("zoom-in-btn");
    const resetElement = screen.getByTestId("reset-btn");
    expect(zoomOutElement).toBeInTheDocument();
    expect(zoomInElement).toBeInTheDocument();
    expect(resetElement).toBeInTheDocument();
  });

  it("show zoom out button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutBtn = screen.getByTestId("zoom-out-btn");
    fireEvent.mouseOver(zoomOutBtn);
    expect(await screen.findByText("Zoom Out")).toBeInTheDocument();
  });

  it("show zoom in button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutBtn = screen.getByTestId("zoom-in-btn");
    fireEvent.mouseOver(zoomOutBtn);
    expect(await screen.findByText("Zoom In")).toBeInTheDocument();
  });

  it("show reset button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutBtn = screen.getByTestId("reset-btn");
    fireEvent.mouseOver(zoomOutBtn);
    expect(await screen.findByText("Reset Scale")).toBeInTheDocument();
  });
});
