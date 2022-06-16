import { render, screen } from "@testing-library/react";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";
import { useStoreSelector } from "@/store/hooks";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    render(<TileColorBoard />);

    const budgetTextElement = screen.getByText(/Estimated Budget:/i);
    expect(budgetTextElement).toBeInTheDocument();
  });

  it("Should render colors of tile correctly", () => {
    render(<TileColorBoard />);

    const tiles = useStoreSelector((state) => state.tile);
    const colors = [];
    for (let i = 0; i < tiles.length; i++) {
      colors.push(tiles[i].color);
    }

    for (const color of colors) {
      const colorElement = screen.getByTestId("color");
      expect(colorElement).toHaveStyle({ "background-color": color });
    }
  });
});
