import EmptyCart from "@/components/ShoppingCart/EmptyCart";
import renderWithMockedProvider from "../../utils";
import { screen, within } from "@testing-library/react";

describe("Empty cart components", () => {
  test("Should render all empty elements", () => {
    renderWithMockedProvider(<EmptyCart />);
    const checkOutButton = screen.getByRole("button", { name: "ReturnHomeBtn" });
    expect(checkOutButton).toBeInTheDocument();
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
    const cartInfoSub1 = screen.getByText("You currently have in your cart");
    expect(cartInfoSub1).toBeVisible();
    const cartInfoSub2 = screen.getByRole("text", { name: "paragraph" });
    expect(within(cartInfoSub2).getByText("no items")).toBeVisible();
  });
});
