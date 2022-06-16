import { fireEvent, render, waitFor } from "@testing-library/react";
import PriceBar from "@/components/PriceBar";

describe("PriceBar", () => {
  it("Should show the price bar with correct content", () => {
    const { getByText, getByTestId } = render(<PriceBar />);

    expect(getByText(/Estimated Budget:/i)).toBeInTheDocument();

    expect(getByTestId("tileBoard")).toBeTruthy();
  });

  it("Should only see the opening button when clicking the closing button", async () => {
    const { getByTestId, getAllByRole } = render(<PriceBar />);

    fireEvent.click(getByTestId("drawer-button"));

    await waitFor(() => {
      expect(getAllByRole("button").length).toBe(1);
    });
  });
});
