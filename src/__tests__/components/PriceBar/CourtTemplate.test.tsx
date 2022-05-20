import { render, screen } from "@testing-library/react";
import CourtTemplate from "@/components/PriceBar/CourtTemplate";

describe("CourtTemplate", () => {
  it("should render templates", () => {
    render(<CourtTemplate />);
    expect(screen.getAllByTestId("courtTemplate")).toBeTruthy();
  });

  it("should render add template button", () => {
    render(<CourtTemplate />);
    expect(screen.getByTestId("addTemplateBtn")).toBeTruthy();
  });
});
