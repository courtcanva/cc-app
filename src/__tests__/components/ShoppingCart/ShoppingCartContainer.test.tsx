import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";

describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={[]} />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={[]} />);
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  it("Should render shopping cart list items correctly", () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={mockCartData} />);
    const cartLength = mockCartData.length;
    expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  });

  it("Should render correct the item data of shopping cart list", () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={mockCartData} />);
    const testData = [
      {quotation: "0.00", productName: "Small Court example"}, 
      {quotation: "0.00", productName: "Pro Full Court example"},
    ];
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item, idx) => {
      expect(within(item).getByText(`AU$${testData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(testData[idx].productName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });
});
