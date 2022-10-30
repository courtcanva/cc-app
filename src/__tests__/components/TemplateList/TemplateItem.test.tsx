import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import TemplateItem from "@/components/TemplateList/TemplateItem";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("Render template item", () => {
  it("Should render all template module elements", () => {
    renderWithMockedProvider(<TemplateItem template={mockTemplateDataRaw[0]} />);
    const designName = screen.getByText(mockTemplateDataRaw[0].design.designName);
    const img = screen.getByRole("img");
    const createDate = screen.getByText(/create/i);
    const courtCategory = screen.getByText(mockTemplateDataRaw[0].tags.CourtCategory);
    const courtType = screen.getByText(mockTemplateDataRaw[0].tags.CourtType);
    expect(designName).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(createDate).toBeInTheDocument();
    expect(courtCategory).toBeInTheDocument();
    expect(courtType).toBeInTheDocument();

    userEvent.hover(img);
    const detailButton = screen.getByRole("button");
    expect(detailButton).toBeVisible();
  });
});
