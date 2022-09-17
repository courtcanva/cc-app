import { render, screen } from "@testing-library/react";
import ShoppingCart from "@/components/NavBar/ShoppingCart";

describe("ShoppingCart", () => {
  const quantity1 = 5;
  it("Should render the quantity '5' and circle element successfully", () => {
    const { getByText } = render(<ShoppingCart quantity={quantity1} />);

    const quantityDivElement = screen.getByTestId("quantity-box");
    expect(quantityDivElement).toBeInTheDocument();
    expect(getByText(5)).toBeInTheDocument();
  });

  const quantity2 = 0;
  it("the circle element should not be rendered", () => {
    render(<ShoppingCart quantity={quantity2} />);
    const quantityDivElement = screen.queryByTestId("quantity-box");
    expect(quantityDivElement).toBeNull();
  });
});
