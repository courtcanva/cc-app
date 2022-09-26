import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";

describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    render(<ShoppingCartContainer shoppingCart={[]} />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    render(<ShoppingCartContainer shoppingCart={[]} />);
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  it("Should render shopping cart list items correctly", () => {
    render(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const cartLength = mockCartData.length;
    expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  });

  it("Should render correct the item data of shopping cart list", () => {
    render(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item, idx) => {
      expect(within(item).getByText(`AU$${mockCartData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(mockCartData[idx].design.designName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });

  it(" Collapse Text element should render correct value and style", () => {
    const { getByTestId } = render(<DropDownButton detail={[{ color: "7088B1", quantity: 71 }]} />);
    const textShow = getByTestId("testShow");
    expect(textShow.textContent).toBe("Color:7088B1,  Quantity:71,  ");
    expect(textShow).toHaveStyle(
      ` overflow-y: hidden; height:25px; white-space:nowrap; text-overflow:ellipsis `
    );
  });

  it("click Button work correctly ", () => {
    const { getByTestId } = render(<DropDownButton detail={[]} />);
    const textShow = getByTestId("testShow");
    const collapseBtn = getByTestId("collapseBtn");
    fireEvent.click(collapseBtn);
    expect(textShow).toHaveStyle(
      `height:auto ; overflow-y:scroll; white-space:normal; text-overflow:clip `
    );
  });
});
