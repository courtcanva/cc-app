import { render, screen } from "@testing-library/react";
import ShoppingCart from "@/components/NavBar/ShoppingCart";

describe("ShoppingCart", () => {
  const props1 = {
    quantity: 5,
    loginState: true,
  };
  it("Should render the quantity '5' and circle element successfully", () => {
    const { getByText } = render(
      <ShoppingCart quantity={props1.quantity} loginState={props1.loginState} />
    );

    const quantityDivElement = screen.getByTestId("quantity-box");
    expect(quantityDivElement).toBeInTheDocument();
    expect(getByText(5)).toBeInTheDocument();
  });

  const props2 = {
    quantity: 0,
    loginState: false,
  };

  it("the circle element should not be rendered", () => {
    render(<ShoppingCart quantity={props2.quantity} loginState={props2.loginState} />);
    const quantityDivElement = screen.queryByTestId("quantity-box");
    expect(quantityDivElement).toBeNull();
  });
});
