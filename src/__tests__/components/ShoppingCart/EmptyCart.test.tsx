import EmptyCart from "@/components/ShoppingCart/EmptyCart";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("Empty cart components", () => {
  test("Should render all empty elements", () => {
    renderWithMockedProvider(<EmptyCart />);
    const checkOutButton = screen.getByRole("button", { name: "ReturnHomeBtn" });
    expect(checkOutButton).toBeInTheDocument();
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
    const cartInfoSub1 = screen.getByText("You currently have", { exact: false });
    expect(cartInfoSub1).toBeVisible();
    const cartInfoSub2 = screen.getByText("no items", { exact: false });
    expect(cartInfoSub2).toBeVisible();
    const cartInfoSub3 = screen.getByText("in your cart", { exact: false });
    expect(cartInfoSub3).toBeVisible();
  });
});
