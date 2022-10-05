import { waitFor, screen, fireEvent, render, within } from "@testing-library/react";
import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import { mockCartData } from "@/components/MockData/MockCartData";
import DeleteComfirmModal from "@/components/DeleteComfirmModal";
import renderWithMockedProvider from "../../utils";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";

describe("ShoppingCart component", () => {
  test("Should render checkout button", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={[]} />);
    const checkOutButton = screen.getByTestId("checkout-btn");
    expect(checkOutButton).toBeInTheDocument();
  });

  it("Should render shopping cart title", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={[]} />);
    const cartTitle = screen.getByText("Shopping Cart");
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
    expect(
      screen.getByText("Are you sure you want to remove this item from the shopping cart?")
    ).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });

  it("Should close modal when click delete button", async () => {
    renderWithMockedProvider(
      <DeleteComfirmModal isOpen onClose={() => void {}} onConfirm={() => void {}} />
    );
    const deleteConfirmBtn = screen.getByRole("button", { name: /Remove/i });
    expect(deleteConfirmBtn).toBeInTheDocument();
    fireEvent.click(deleteConfirmBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });

  it("Collapse Text element should render correct value and style", () => {
    const { getByTestId } = render(<DropDownButton detail={[{ color: "7088B1", quantity: 71 }]} />);
    const textShow = getByTestId("testShow");
    expect(textShow.textContent).toBe("Color:7088B1,  Quantity:71,  ");
    expect(textShow).toHaveStyle(
      ` overflow-y: hidden; height:25px; white-space:nowrap; text-overflow:ellipsis `
    );
  });

  it("click Button work correctly", () => {
    const { getByTestId } = render(<DropDownButton detail={[]} />);
    const textShow = getByTestId("testShow");
    const collapseBtn = getByTestId("collapseBtn");
    fireEvent.click(collapseBtn);
    expect(textShow).toHaveStyle(
      `height:auto ; overflow-y:scroll; white-space:normal; text-overflow:clip `
    );
  });

  it("Should render expired message", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const expiredMessage = screen.getByText(
      "Sorry, some product’s quotation has expired. Please edit your cart and try again. We’re apologize for any inconvenience caused."
    );
    expect(expiredMessage).toBeVisible();
  });

  it("Should render expired icon and expired quotation message", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const listItems = screen.queryAllByRole("dataRow");
    mockCartData.forEach((item, index) => {
      if (item.isExpired) {
        expect(within(listItems[index]).getByTestId("expired-icon")).toBeVisible();
        expect(within(listItems[index]).getByText("Quotation has expired.")).toBeVisible();
      }
    });
  });
});
