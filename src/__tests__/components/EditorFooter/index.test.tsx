import { fireEvent, screen } from "@testing-library/react";
import EditorFooter from "@/components/EditorFooter";
import renderWithMockedProvider from "../../utils";

describe("EditorFooter", () => {
  it("should see the switch button", () => {
    renderWithMockedProvider(<EditorFooter />);
    const switchButton = screen.getByTestId("switch-btn");
    expect(switchButton).toBeInTheDocument();
  });

  it("should toggle between on and off", () => {
    const { getByTestId } = renderWithMockedProvider(<EditorFooter />);
    const switchButton = getByTestId("switch-btn");
    fireEvent.click(switchButton);
    expect(getByTestId("ruler-label")).toHaveTextContent("RULER OFF");
    fireEvent.click(switchButton);
    expect(getByTestId("ruler-label")).toHaveTextContent("RULER ON");
  });
  it("Each button in the navbar needs to display the correct text", () => {
    renderWithMockedProvider(<EditorFooter />);

    const zoomOutElement = screen.getByTestId("zoom-out-btn");
    const zoomInElement = screen.getByTestId("zoom-in-btn");
    const helpElement = screen.getByTestId("help-btn");

    expect(zoomOutElement).toBeInTheDocument();
    expect(zoomInElement).toBeInTheDocument();
    expect(helpElement).toBeInTheDocument();
  });
});
