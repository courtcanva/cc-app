import Templates from "@/components/EditorSideBar/Templates";
import { mockTemplate } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import renderWithMockedProvider from "../../utils";

describe("Render the templates", () => {
  const mockTemplateData = mockTemplate;
  test("The templates is correctly rendered", () => {
    renderWithMockedProvider(<Templates templatesData={mockTemplateData} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(1);
  });
});
