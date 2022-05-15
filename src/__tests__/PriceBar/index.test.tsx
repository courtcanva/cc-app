import { render, screen } from "@testing-library/react";
import PriceBar from "../../components/PriceBar";

test("Price sum in the pricebar needs to display the correct text", () => {
  render(<PriceBar />);

  const EstimatePriceElement = screen.getByText(/Estimated Budget: From/i);

  expect(EstimatePriceElement).toBeInTheDocument();
});
