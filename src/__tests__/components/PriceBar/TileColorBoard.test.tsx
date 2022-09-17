import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";
import renderWithMockedProvider from "../../utils";
import { initialState, PriceBar } from "@/store/reducer/priceBarSlice";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const budgetTextEl = screen.getByText(/Estimated Budget/i);
    expect(budgetTextEl).toBeInTheDocument();
  });

  it("Should render tile blocks", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const previousState: PriceBar[] = initialState.blocks;
    const tileElements = screen.getAllByRole("tileBlock");
    expect(tileElements.length).toBe(previousState.length);
  });

  it("Should render the clickable add-to-cart button", () => {
    renderWithMockedProvider(<TileColorBoard />);
    const cartBtn = screen.getByText(/Add to Cart/i);
    expect(cartBtn).toBeInTheDocument();
    userEvent.click(cartBtn);
    expect(cartBtn).toBeInTheDocument();
  });
});
