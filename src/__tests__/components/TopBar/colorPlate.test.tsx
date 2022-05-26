import { render, screen } from "@testing-library/react";
import ColorPlate from "@/components/TopBar/ColorBoard";
import mockPlateColors from "@/components/TopBar/colorList";

describe("ColorPlate", () => {
  it("Should render color plate", () => {
    render(<ColorPlate />);

    expect(screen.getByTestId("colorPlate")).toBeTruthy();
  });

  it("Should render colors correctly", () => {
    render(<ColorPlate />);

    for (let index = 0; index < mockPlateColors.length; index++) {
      const color = mockPlateColors[index];
      const colorElement = screen.getByTestId(color);
      expect(colorElement).toHaveStyle({ 'background-color': color });
    }
  });
});
