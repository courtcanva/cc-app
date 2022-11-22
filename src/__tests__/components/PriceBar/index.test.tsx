import { screen } from "@testing-library/react";
import PriceBar from "@/components/PriceBar";
import renderWithMockedProvider from "../../utils";

describe("PriceBar", () => {
  it("Should show the price bar with correct content", () => {
    renderWithMockedProvider(<PriceBar />);

    expect(screen.getByText(/Quotation/i)).toBeInTheDocument();
    expect(screen.getByText(/Deposit/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated Tiles/i)).toBeInTheDocument();
    expect(screen.getByTestId("tileBoard")).toBeTruthy();
  });
});
