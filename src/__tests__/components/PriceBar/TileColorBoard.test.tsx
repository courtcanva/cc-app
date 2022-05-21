import { render, screen } from "@testing-library/react";
import TileColorBoard from "@/components/PriceBar/TileColorBoard";

describe("TileColorBoard", () => {
  it("Should render estimated budget text", () => {
    render(<TileColorBoard />);

    const budgetTextElement = screen.getByText(/Estimated Budget:/i);
    expect(budgetTextElement).toBeInTheDocument();
  });
});
