import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    renderWithMockedProvider(<ShoppingCartContainer />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    renderWithMockedProvider(<ShoppingCartContainer />);
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  it("Should render shopping cart table elements correctly", () => {
    renderWithMockedProvider(<ShoppingCartContainer />);
    const productHead = screen.getByText("Product");
    const quotationHead = screen.getByText("Quotation");
    const quotationDetialHead = screen.getByText("Quotation Detials");
    expect(productHead).toBeVisible();
    expect(quotationHead).toBeVisible();
    expect(quotationDetialHead).toBeVisible();
  });
});
