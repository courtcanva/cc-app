import EmptyCart from "@/components/ShoppingCart/EmptyCart";
import renderWithMockedProvider from "../../utils";
import { screen, within } from "@testing-library/react";

describe("Empty cart components", () => {
  test("Should render all empty elements", () => {
    renderWithMockedProvider(<EmptyCart />);
    const checkOutButton = screen.getByRole("button", { name: "ReturnHomeBtn" });
    const cartTitle = screen.getByText("CART");
    const cartInfoSub1 = screen.getByText("You currently have in your cart");
    const cartInfoSub2 = screen.getByRole("text", { name: "paragraph" });
    expect(checkOutButton).toBeInTheDocument();
    expect(cartTitle).toBeVisible();
    expect(cartInfoSub1).toBeVisible();
    expect(within(cartInfoSub2).getByText("no items")).toBeVisible();
  });
});
