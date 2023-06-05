import { screen } from "@testing-library/react";
import EditorRightSideBar from "@/components/EditorRightSideBar";
import renderWithMockedProvider from "../../utils";

describe("EditorRightSideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    renderWithMockedProvider(<EditorRightSideBar />);
    // const courtCanva1Text = screen.getByText("CourtCanva1");
    // const designToolsText = screen.getByText("Design Tools");

    const displayAdjustmentText = screen.getByText("Display Adjustment");
    const quotationText = screen.getByText("Quote");

    // expect(courtCanva1Text).toBeInTheDocument();
    // expect(designToolsText).toBeInTheDocument();
    expect(displayAdjustmentText).toBeInTheDocument();
    expect(quotationText).toBeInTheDocument();
  });
});
