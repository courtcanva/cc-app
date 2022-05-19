import { fireEvent, render, screen } from "@testing-library/react";
import BottomMenu from "@/components/BottomMenu";

describe("BottomMenu", () => {
  it("Should see the drawer opening button", () => {
    render(<BottomMenu />);
    const drawerOpenButton = screen.getByRole("button");

    expect(drawerOpenButton).toBeInTheDocument();
  });

  it("Should show the drawer when clicking the opening button", () => {
    const { getByText } = render(<BottomMenu />);
    const drawerOpenButton = screen.getByRole("button");

    fireEvent.click(drawerOpenButton);
    expect(getByText(/Estimated Budget:/i)).toBeInTheDocument();
  });
});
