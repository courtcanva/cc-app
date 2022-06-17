import { screen } from "@testing-library/react";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";
import renderWithMockedProvider from "../../utils";
import { initialState, tileState } from "@/store/reducer/tileSlice";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const budgetTextEl = screen.getByText(/Estimated Budget:/i);
    expect(budgetTextEl).toBeInTheDocument();
  });

  it("Should render tile blocks", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const previousState: tileState[] = initialState;
    const tileElements = screen.getAllByRole("tileBlock");
    expect(tileElements.length).toBe(previousState.length);
  });
});
