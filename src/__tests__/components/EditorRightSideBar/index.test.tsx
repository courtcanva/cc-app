import { screen } from "@testing-library/react";
import EditorRightSideBar from "@/components/EditorRightSideBar";
import renderWithMockedProvider from "../../utils";

describe("EditorRightSideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    renderWithMockedProvider(<EditorRightSideBar />);

    const displayAdjustmentText = screen.getByText("Display Adjustment");
    const quotationText = screen.getAllByText("Quotation");

    expect(displayAdjustmentText).toBeInTheDocument();
    expect(quotationText).toHaveLength(2);
  });
});
