import { screen } from "@testing-library/react";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";
import renderWithMockedProvider from "../../utils";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const budgetTextEl = screen.getByText(/Estimated Budget:/i);
    expect(budgetTextEl).toBeInTheDocument();
  });

  it("Should render tile blocks", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const tileElements = screen.getAllByRole("tileBlock");
    expect(tileElements.length).toBe(6);
  });
});
