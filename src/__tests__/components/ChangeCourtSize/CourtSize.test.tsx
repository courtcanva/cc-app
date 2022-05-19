import CourtSize from "@/components/ChangeCourtSize/CourtSize";
import { render, screen } from "@testing-library/react";

describe("CourtSize", () => {
  it("Should render each court correctly and should render six court", () => {
    render(<CourtSize />);

    const courts = screen.getAllByText(/Court/i);
    expect(courts.length).toBe(6);

    for (const element of screen.getAllByText(/Court/i)) {
      expect(element).toBeVisible();
    }
  });
});
