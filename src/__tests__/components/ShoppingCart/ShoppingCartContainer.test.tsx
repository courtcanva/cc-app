import { waitFor, screen, fireEvent, render, within } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store";
import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import { mockCartData } from "@/components/MockData/MockCartData";
import DeleteComfirmModal from "@/components/DeleteComfirmModal";
describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    render(
      <Provider store={store}>
        <ShoppingCartContainer shoppingCart={[]} />
      </Provider>
    );
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    render(
      <Provider store={store}>
        <ShoppingCartContainer shoppingCart={[]} />
      </Provider>
    );
    const cartTitle = screen.getByText("CART");
    expect(cartTitle).toBeVisible();
  });

  it("Should render shopping cart list items correctly", () => {
    render(
      <Provider store={store}>
        <ShoppingCartContainer shoppingCart={mockCartData} />
      </Provider>
    );
    const cartLength = mockCartData.length;
    expect(screen.queryAllByRole("dataRow")).toHaveLength(cartLength);
  });

  it("Should render correct the item data of shopping cart list", () => {
    render(
      <Provider store={store}>
        <ShoppingCartContainer shoppingCart={mockCartData} />
      </Provider>
    );
    const listItems = screen.queryAllByRole("dataRow");
    listItems.forEach((item, idx) => {
      expect(within(item).getByText(`AU$${mockCartData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(mockCartData[idx].design.designName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartEditBtn" })).toBeVisible();
    });
  });

  it("Should render delete confirm modal and close the modal when click cancel button", async () => {
    render(
      <Provider store={store}>
        <DeleteComfirmModal isOpen onClose={() => void {}} onConfirm={() => void {}} />
      </Provider>
    );
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    expect(screen.getByText("You are about to delete a design")).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });

  it("Should close modal when click delete button", async () => {
    render(
      <Provider store={store}>
        <DeleteComfirmModal isOpen onClose={() => void {}} onConfirm={() => void {}} />
      </Provider>
    );
    const deleteConfirmBtn = screen.getByRole("button", { name: /delete/i });
    expect(deleteConfirmBtn).toBeInTheDocument();
    fireEvent.click(deleteConfirmBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });
});
