import { render, screen } from "@testing-library/react";
import TireColorBoard from "@/components/BottomMenu/TireColorBoard";

describe("TireColorBoard", () => {
  it("Should render estimated budget text", () => {
    render(<TireColorBoard />);

    const budgetTextElement = screen.getByText(/Estimated Budget:/i);
    expect(budgetTextElement).toBeInTheDocument();
  });
});
