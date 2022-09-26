import { waitFor, screen, fireEvent, render, within } from "@testing-library/react";
import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import { mockCartData } from "@/components/MockData/MockCartData";
import DeleteComfirmModal from "@/components/DeleteComfirmModal";
import renderWithMockedProvider from "../../utils";
describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={[]} />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={[]} />);
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  it("Should render shopping cart list items correctly", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const cartLength = mockCartData.length;
    expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  });

  it("Should render correct the item data of shopping cart list", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item, idx) => {
      expect(within(item).getByText(`AU$${mockCartData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(mockCartData[idx].design.designName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });

  it("Should render delete confirm modal and close the modal when click cancel button", async () => {
    renderWithMockedProvider(
      <DeleteComfirmModal isOpen onClose={() => void {}} onConfirm={() => void {}} />
    );
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    expect(screen.getByText("You are about to delete a design")).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });

  it("Should close modal when click delete button", async () => {
    renderWithMockedProvider(
      <DeleteComfirmModal isOpen onClose={() => void {}} onConfirm={() => void {}} />
    );
    const deleteConfirmBtn = screen.getByRole("button", { name: /delete/i });
    expect(deleteConfirmBtn).toBeInTheDocument();
    fireEvent.click(deleteConfirmBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });
});
