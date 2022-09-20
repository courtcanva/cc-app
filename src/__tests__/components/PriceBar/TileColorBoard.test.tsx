import { screen } from "@testing-library/react";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";
import renderWithMockedProvider from "../../utils";
import { initialState, PriceBar } from "@/store/reducer/priceBarSlice";

describe("TileColorBoard", () => {
  it("Should render tile blocks", () => {
    const setTotalPrice = jest.fn();
    renderWithMockedProvider(<TileColorBoard setTotalPrice={setTotalPrice} />);
    const previousState: PriceBar[] = initialState.blocks;
    const tileElements = screen.getAllByRole("tileBlock");
    expect(tileElements.length).toBe(previousState.length);
  });
});
