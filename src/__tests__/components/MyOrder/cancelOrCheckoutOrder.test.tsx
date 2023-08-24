import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import CancelOrCheckoutOrder from "../../../components/MyOrder/CancelOrCheckoutOrder";

describe("CancelOrCheckoutOrder", () => {
  const props = {
    orderId: "1111",
    userId: "222",
    depositRatio: 0.02,
    unpaidItems: [],
  };

  it("should render the button content correctly and be called when click", () => {
    renderWithMockedProvider(
      <CancelOrCheckoutOrder
        orderId={props.orderId}
        userId={props.userId}
        depositRatio={props.depositRatio}
        unPaidItems={props.unpaidItems}
        isChecked={true}
      />
    );
    const proceedToCheckoutBtn = screen.getByRole("button", { name: "Proceed to Checkout" });
    expect(proceedToCheckoutBtn).toBeInTheDocument();
  });
});
