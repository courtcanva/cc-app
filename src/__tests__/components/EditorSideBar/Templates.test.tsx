import Templates from "@/components/EditorSideBar/Templates";
import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import renderWithMockedProvider from "../../utils";

describe("Render the templates list", () => {
  test("Notice of empty template list is correct rendered", () => {
    renderWithMockedProvider(<Templates templatesData={[]} />);
    const emptyList = screen.getByText(/the template list is empty/i);
    expect(emptyList).toBeInTheDocument();
  });

  test("All templates are correctly rendered", () => {
    renderWithMockedProvider(<Templates templatesData={mockTemplateDataRaw} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(3);
  });
});
