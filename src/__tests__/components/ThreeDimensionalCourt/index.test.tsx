import { screen } from "@testing-library/dom";
import ThreeDimensionalToggle from "@/components/ThreeDimensionalCourt";
import renderWithMockedProvider from "../../utils";

describe("render three dimensional control siderbar", () => {
  it("should render correct text", () => {
    renderWithMockedProvider(<ThreeDimensionalToggle height={500} width={500} />);
    expect(screen.getByText("3D Preview")).toBeInTheDocument();
  });
});
