import { waitFor, screen, fireEvent, render, within } from "@testing-library/react";
import ShoppingCartContainer from "@/components/ShoppingCart/ShoppingCartContainer";
import { mockCartData } from "@/components/MockData/MockCartData";
import ConfirmModal from "@/components/ComfirmModal";
import renderWithMockedProvider from "../../utils";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";
import { ICourtSize } from "@/interfaces/design";

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
      expect(within(item).getByText(`A$${mockCartData[idx].quotation}`)).toBeVisible();
      expect(within(item).getByText(mockCartData[idx].design.designName)).toBeVisible();
      expect(within(item).getByRole("button", { name: "cartDeleteBtn" })).toBeVisible();
    });
  });

  it("Should render delete confirm modal and close the modal when click cancel button", async () => {
    renderWithMockedProvider(
      <ConfirmModal
        isOpen
        onClose={() => void {}}
        onConfirm={() => void {}}
        buttonText="Remove"
        alertText="remove this item from the shopping cart"
      />
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
      <ConfirmModal
        isOpen
        onClose={() => void {}}
        onConfirm={() => void {}}
        buttonText="Remove"
        alertText=""
      />
    );
    const deleteConfirmBtn = screen.getByRole("button", { name: /Remove/i });
    expect(deleteConfirmBtn).toBeInTheDocument();
    fireEvent.click(deleteConfirmBtn);
    const deleteConfirmModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(deleteConfirmModalDialog).not.toBeVisible());
  });

  it("Collapse Text element should render correct text and style", () => {
    const courtDetail = mockCartData[0].design.courtSize as ICourtSize;
    const { getByTestId } = render(<DropDownButton detail={courtDetail} />);
    const textShow = getByTestId("testShow");
    expect(textShow.textContent).toBe(
      "Court MaterialTiles (9m*5m,Small Court)ShippingInstallation feeCourt tile pavingCourt painting"
    );
    expect(textShow).toHaveStyle(
      ` overflow-y: hidden; white-space:nowrap; text-overflow:ellipsis `
    );
  });

  it("click Button work correctly", () => {
    const courtDetail = mockCartData[0].design.courtSize as ICourtSize;
    const { getByTestId } = render(<DropDownButton detail={courtDetail} />);
    const textShow = getByTestId("testShow");
    const collapseBtn = getByTestId("collapseBtn");
    fireEvent.click(collapseBtn);
    expect(textShow).toHaveStyle(
      `height:auto ; overflow-y:scroll; white-space:normal; text-overflow:clip `
    );
  });

  it("Should render expired message when one or more item expired", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={mockCartData} />);
    const expiredMessage = screen.getByText(
      "Sorry, some quotation has expired. Please edit your cart and try again. We apologize for any inconvenience caused."
    );
    expect(expiredMessage).toBeVisible();
  });

  it("Should render expired icon and expired quotation message when item is expired", () => {
    renderWithMockedProvider(<ShoppingCartContainer shoppingCart={[mockCartData[0]]} />);
    const expireIcon = screen.getByTestId("expired-icon");
    const expireText = screen.getByText("Quotation expired");
    expect(expireText).toBeVisible();
    expect(expireIcon).toBeVisible();
  });

  it("Should not render expired icon and expired quotation message when item is not expired", () => {
    renderWithMockedProvider(
      <ShoppingCartContainer shoppingCart={[mockCartData[1], mockCartData[2]]} />
    );
    const expireIcon = screen.queryByTestId("expired-icon");
    const expireText = screen.queryByText("Quotation has expired.");
    expect(expireText).toBeNull();
    expect(expireIcon).toBeNull();
  });

  it("Should not render expired message if there is no expired item", () => {
    renderWithMockedProvider(
      <ShoppingCartContainer shoppingCart={[mockCartData[1], mockCartData[2]]} />
    );
    const expiredMessage = screen.queryByText(
      "Sorry, some product’s quotation has expired. Please edit your cart and try again. We apologize for any inconvenience caused."
    );
    expect(expiredMessage).toBeNull();
  });
});
