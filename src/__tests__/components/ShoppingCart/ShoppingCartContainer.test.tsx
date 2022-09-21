import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { mockCartData2 } from "@/components/MockData/MockCartData";

// Havent update mock data to the container

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

  // it("Should render shopping cart list items correctly", () => {
  //   renderWithMockedProvider(
  //     <ShoppingCartContainer
  //       userShoppingCart={mockCartData2.userShoppingCart}
  //     />
  //   );
  //   const cartLength = mockCartData.userShoppingCart.length;
  //   expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  // });

  // it("Should render correct the item data of shopping cart list", () => {
  //   renderWithMockedProvider(
  //     <ShoppingCartContainer
  //       userid={mockCartData.userid}
  //       userShoppingCart={mockCartData.userShoppingCart}
  //     />
  //   );
  //   const listItems = screen.queryAllByRole("dataRow");
  //   listItems.forEach((item) => {
  //     expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
  //     expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
  //   });
  // });
});
