import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";

// Havent update mock data to the container

describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    renderWithMockedProvider(<ShoppingCartContainer userid={""} userShoppingCart={[]} />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    renderWithMockedProvider(<ShoppingCartContainer userid={""} userShoppingCart={[]} />);
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  // it("Should render shopping cart table elements correctly", () => {
  //   renderWithMockedProvider(<ShoppingCartContainer userid={""} userShoppingCart={[]} />);
  //   const productHead = screen.getByText("Product");
  //   const quotationHead = screen.getByText("Quotation");
  //   const quotationDetialHead = screen.getByText("Quotation Detials");
  //   expect(productHead).toBeVisible();
  //   expect(quotationHead).toBeVisible();
  //   expect(quotationDetialHead).toBeVisible();
  // });

  // it("Should render shopping cart list items correctly", () => {
  //   renderWithMockedProvider(<ShoppingCartContainer userid={""} userShoppingCart={[]} />);
  //   expect(screen.queryAllByRole("row")).toHaveLength(8);
  // });

  it("Should render correct the item data of shopping cart list", () => {
    renderWithMockedProvider(
      <ShoppingCartContainer
        userid={mockCartData.userid}
        userShoppingCart={mockCartData.userShoppingCart}
      />
    );
    const listItems = screen.queryAllByRole("dataRow");
    for (let i = 0; i < listItems.length; i++) {
      expect(within(listItems[i]).getByText("Tom's Basketball Court")).toBeVisible();
      expect(within(listItems[i]).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(listItems[i]).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    }
  });
});
