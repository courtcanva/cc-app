import { fireEvent, render, screen } from "@testing-library/react";
import ChangeCourtSize from "@/components/ChangeCourtSize";

describe("ChangeCourtSize", () => {
  it("Should render opening button", () => {
    render(<ChangeCourtSize />);

    const openButton = screen.getByRole("button");
    expect(openButton).toBeInTheDocument();
  });

  it("should render six courts when clicking the select court size button", () => {
    const { getAllByText } = render(<ChangeCourtSize />);
    const openButton = screen.getByRole("button");

    fireEvent.click(openButton);
    expect(getAllByText(/Court$/i).length).toBe(6);
  });
});
