import OrderContainer from "@/components/OrderGeneration/OrderContainer";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Order Generation", () => {
  it("Should render all page titles", () => {
    renderWithMockedProvider(<OrderContainer />);

    const pageTitle = screen.getByText("Order Generation");
    const checkboxText = screen.getByText("terms & conditions");

    expect(pageTitle).toBeInTheDocument();
    expect(checkboxText).toBeInTheDocument();
  });

  it("Should render buttons and disable the checkout button initially", () => {
    renderWithMockedProvider(<OrderContainer />);

    const backBtn = screen.getByRole("button", { name: "Back" });
    const checkOutBtn = screen.getByRole("button", { name: "Proceed to Checkout" });

    expect(backBtn).toBeInTheDocument();
    expect(checkOutBtn).toBeInTheDocument();
    expect(checkOutBtn).toBeDisabled();
  });

  it("Should render the checkbox and enable the checkout button when tick the checkbox", () => {
    renderWithMockedProvider(<OrderContainer />);

    const checkbox = screen.getByRole("checkbox");
    const checkOutBtn = screen.getByRole("button", { name: "Proceed to Checkout" });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(checkOutBtn).not.toBeDisabled();
  });
});
