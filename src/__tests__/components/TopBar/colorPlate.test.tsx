import { render, screen } from "@testing-library/react";
import ColorPlate from "../../../components/TopBar/colorPlate"

describe("ColorPlate", () => {
  it("Should render color plate colors", () => {
    render(<ColorPlate />);

    expect(screen.getByTestId("colorPlate")).toBeTruthy();
  });
});
