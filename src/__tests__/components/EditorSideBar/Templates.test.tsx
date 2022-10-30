import Templates from "@/components/EditorSideBar/Templates";
import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import renderWithMockedProvider from "../../utils";

describe("Render the templates", () => {
  test("The templates is correctly rendered", () => {
    renderWithMockedProvider(<Templates templatesData={mockTemplateDataRaw} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(3);
  });
});
