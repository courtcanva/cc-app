import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import renderWithMockedProvider from "../../utils";
import { waitFor, screen, fireEvent, within } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";
import { useDeleteItemFromCartMutation } from "@/redux/api/cartApi";
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
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item, idx) => {
      expect(within(item).getByText(`AU$${mockCartData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(mockCartData[idx].design.designName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });

  it("Should render delete confirm modal when delete btn clicked", async () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={mockCartData} />);
    const listItems = screen.queryAllByRole("dataRow");
    const delBtn = within(listItems[0]).getByRole("button", { name: "cartDeleteBtn" });
    expect(delBtn).toBeVisible();
    fireEvent.click(delBtn);
    expect(screen.getByText("You are about to delete a design")).toBeInTheDocument();
    await waitFor(() => {
      const cancelBtn = screen.getByRole("button", { name: /cancel/i });
      expect(cancelBtn).toBeVisible();
      fireEvent.click(cancelBtn);
    });
    await waitFor(() => {
      expect(screen.queryByText("You are about to delete a design")).not.toBeInTheDocument();
    });
  });

  it("Should card item removed when delete confirmed", async () => {
    renderWithMockedProvider(<ShoppingCartContainer userShoppingCart={mockCartData} />);
    const listItems = screen.queryAllByRole("dataRow");
    const delBtn = within(listItems[0]).getByRole("button", { name: "cartDeleteBtn" });
    expect(delBtn).toBeVisible();
    fireEvent.click(delBtn);
    await waitFor(() => {
      const confirmBtn = screen.getByRole("button", { name: /delete/i });
      expect(confirmBtn).toBeVisible();
      fireEvent.click(confirmBtn);
    });
    await waitFor(() => {
      expect(screen.queryByText("You are about to delete a design")).not.toBeInTheDocument();
    });
  });
});
