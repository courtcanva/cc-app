import { render, screen } from "@testing-library/react";
import ColorBoard from "@/components/TopBar/ColorBoard";
import mockPlateColors from "@/components/TopBar/colorList";
import renderWithMockedProvider from "../../utils";

describe("ColorBoard", () => {
  it("Should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);

    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });

  it("Should render colors correctly", () => {
    renderWithMockedProvider(<ColorBoard />);

    for (const color of mockPlateColors) {
      const colorElement = screen.getByTestId(color);
      expect(colorElement).toHaveStyle({ "background-color": color });
    }
  });
});
