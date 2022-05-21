import { fireEvent, render, screen } from "@testing-library/react";
import PriceBar from "@/components/PriceBar";

describe("PriceBar", () => {
  it("Should see the drawer opening button with no content", () => {
    render(<PriceBar />);
    const drawerOpenButton = screen.getByRole("button");
    const budget = screen.queryByText(/Estimated Budget:/i); // color board and budget
    const buttons = screen.queryAllByRole("button"); // court template

    expect(drawerOpenButton).toBeInTheDocument();
    expect(budget).toBeFalsy();
    expect(buttons.length).toBe(1);
  });

  it("Should show the drawer with right content when clicking the opening button", () => {
    const { getByText } = render(<PriceBar />);
    const drawerOpenButton = screen.getByRole("button");

    fireEvent.click(drawerOpenButton);

    // color board and budget
    expect(getByText(/Estimated Budget:/i)).toBeInTheDocument();

    // court template
    for (const element of screen.getAllByRole("button")) {
      expect(element).toHaveFocus();
    }
  });
});
