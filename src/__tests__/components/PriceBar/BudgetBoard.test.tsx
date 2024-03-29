import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BudgetBoard from "@/components/PriceBar/BudgetBoard";
import renderWithMockedProvider from "../../utils";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    renderWithMockedProvider(<BudgetBoard useTotalPrice="" />);
    expect(screen.getByText(/Quotation/i)).toBeInTheDocument();
    expect(screen.getByText(/Deposit/i)).toBeInTheDocument();
  });

  it("Should render the clickable add-to-cart button", () => {
    renderWithMockedProvider(<BudgetBoard useTotalPrice="" />);
    const cartBtn = screen.getByText(/Add to Cart/i);
    expect(cartBtn).toBeInTheDocument();
    userEvent.click(cartBtn);
    expect(cartBtn).toBeInTheDocument();
  });
});
