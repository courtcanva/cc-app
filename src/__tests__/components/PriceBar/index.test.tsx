import { fireEvent, render, screen } from "@testing-library/react";
import PriceBar from "@/components/PriceBar";

describe("PriceBar", () => {
  it("Should see the drawer opening button", () => {
    render(<PriceBar />);
    const drawerOpenButton = screen.getByRole("button");

    expect(drawerOpenButton).toBeInTheDocument();
  });

  it("Should show the drawer when clicking the opening button", () => {
    const { getByText } = render(<PriceBar />);
    const drawerOpenButton = screen.getByRole("button");

    fireEvent.click(drawerOpenButton);
    expect(getByText(/Estimated Budget:/i)).toBeInTheDocument();
  });
});
