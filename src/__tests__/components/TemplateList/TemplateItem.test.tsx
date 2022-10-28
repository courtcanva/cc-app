import { mockTemplate } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import TemplateItem from "@/components/TemplateList/TemplateItem";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("Render template item", () => {
  it("Should render all template module elements", () => {
    renderWithMockedProvider(<TemplateItem template={mockTemplate[0]} />);
    const designName = screen.getByText("Mock design");
    const img = screen.getByRole("img");
    const createDate = screen.getByText(/create/i);
    const courtCategory = screen.getByText(/prohalfcourt/i);
    const courtType = screen.getByText(/basketball/i);
    expect(designName).toBeInTheDocument;
    expect(img).toBeInTheDocument;
    expect(createDate).toBeInTheDocument;
    expect(courtCategory).toBeInTheDocument;
    expect(courtType).toBeInTheDocument;

    userEvent.hover(img);
    const detailButton = screen.getByRole("button");
    expect(detailButton).toBeVisible;
  });
});
