import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";
import { forEach } from "lodash";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";

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

  it("Should render shopping cart list items correctly", () => {
    renderWithMockedProvider(
      <ShoppingCartContainer
        userid={mockCartData.userid}
        userShoppingCart={mockCartData.userShoppingCart}
      />
    );
    const cartLength = mockCartData.userShoppingCart.length;
    expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  });

  it("Should render correct the item data of shopping cart list", () => {
    renderWithMockedProvider(
      <ShoppingCartContainer
        userid={mockCartData.userid}
        userShoppingCart={mockCartData.userShoppingCart}
      />
    );
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item) => {
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });

  it(" Collapse Text element should render correct value and style", () => {
    const { getByTestId } = render(<DropDownButton content="Testing" />);
    const textShow = getByTestId("testShow");
    expect(textShow.textContent).toBe("Testing");
    expect(textShow).toHaveStyle(` overflowY: hidden; height:25px `);
  });

  it("click Button work correctly ", () => {
    const { getByTestId } = render(<DropDownButton content="" />);
    const textShow = getByTestId("testShow");
    const collapseBtn = getByTestId("collapseBtn");
    fireEvent.click(collapseBtn);
    expect(textShow).toHaveStyle(`height:auto ; overflowY:scroll`);
  });
});
