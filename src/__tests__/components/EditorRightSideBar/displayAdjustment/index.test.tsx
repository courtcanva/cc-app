import { screen } from "@testing-library/react";
import DisplayAdjustment from "@/components/EditorRightSideBar/DisplayAdjustment";
import renderWithMockedProvider from "../../../utils";
import user from "@testing-library/user-event";

describe("EditorFooter", () => {
  // test elements are rendered
  it("should render zoom scale percentage information", () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomScale = screen.getByText("100 %");
    expect(zoomScale).toBeVisible();
  });

  it("Each element in the Display Adjustment component to display the correct text", () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutElement = screen.getByRole("button", { name: /Revert edit/i });
    const zoomInElement = screen.getByRole("button", { name: /Forward edit/i });
    const resetElement = screen.getByRole("button", { name: /reset zoom/i });
    const switchElement = screen.getByLabelText("Ruler");
    expect(zoomOutElement).toBeInTheDocument();
    expect(zoomInElement).toBeInTheDocument();
    expect(resetElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
  });

  // test tooltips work well
  it("show zoom out button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutElement = screen.getByRole("button", { name: /Revert edit/i });
    user.hover(zoomOutElement);
    expect(await screen.findByText("Zoom Out")).toBeInTheDocument();
  });

  it("show zoom in button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomInElement = screen.getByRole("button", { name: /Forward edit/i });
    user.hover(zoomInElement);
    expect(await screen.findByText("Zoom In")).toBeInTheDocument();
  });

  it("show reset button info in tooltip", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const resetElement = screen.getByRole("button", { name: /reset zoom/i });
    user.hover(resetElement);
    expect(await screen.findByText("Reset Court Scale")).toBeInTheDocument();
  });

  // test click function is work
  // zoom out to 90%
  it("zoom scale percentage information will reach 90% if click once zoom out button", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomOutElement = screen.getByRole("button", { name: /Revert edit/i });
    user.click(zoomOutElement);
    const updatedZoomScale = screen.getByText("90 %");
    expect(updatedZoomScale).toBeVisible();
  });

  // reset to 100%
  it("zoom scale percentage information will reset to 100% if click once Reset Court Scale", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const resetElement = screen.getByRole("button", { name: /reset zoom/i });
    user.click(resetElement);
    const updatedZoomScale = screen.getByText("100 %");
    expect(updatedZoomScale).toBeVisible();
  });

  // zoom in to 110%
  it("zoom scale percentage information will reach 110% if click once zoom in button", async () => {
    renderWithMockedProvider(<DisplayAdjustment />);
    const zoomInElement = screen.getByRole("button", { name: /Forward edit/i });
    user.click(zoomInElement);
    const updatedZoomScale = screen.getByText("110 %");
    expect(updatedZoomScale).toBeVisible();
  });
});
