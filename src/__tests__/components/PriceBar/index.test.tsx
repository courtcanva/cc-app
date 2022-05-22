import { fireEvent, render, waitFor } from "@testing-library/react";
import PriceBar from "@/components/PriceBar";

describe("PriceBar", () => {
  it("Should show the drawer with correct content", () => {
    const { getByText, getAllByTestId } = render(<PriceBar />);

    // color board and budget
    expect(getByText(/Estimated Budget:/i)).toBeInTheDocument();

    // court template
    expect(getAllByTestId("courtTemplate")).toBeTruthy();
  });

  it("Should only see the opening button when clicking the closing button", async () => {
    const { getByTestId, queryByText, getAllByRole } = render(<PriceBar />);

    fireEvent.click(getByTestId("drawer-button"));

    await waitFor(() => {
      expect(queryByText(/Estimated Budget:/i)).not.toBeInTheDocument();
      expect(getAllByRole("button").length).toBe(1);
    });
  });
});
