import { render, screen } from "@testing-library/react";
import ShoppingCart from "@/components/NavBar/ShoppingCart";

describe("ShoppingCart", () => {
  const quantity = 5;
  it("Should render the quantity and circle element successfully", () => {
    const { getByText } = render(<ShoppingCart quantity={quantity} />);

    const quantityDivElement = screen.getByTestId("quantity-box");
    expect(quantityDivElement).toBeInTheDocument();
    expect(getByText(5)).toBeInTheDocument();
  });
});
