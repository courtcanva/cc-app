import Templates from "@/components/EditorSideBar/Templates";
import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";
import { screen } from "@testing-library/dom";
import renderWithMockedProvider from "../../utils";
import { Props } from "@/components/EditorSideBar/Templates";

describe("Render the templates list", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  it("Notice of empty template list is correct rendered", () => {
    renderWithMockedProvider(<Templates />);
    const emptyList = screen.getByText(/the template list is empty/i);
    expect(emptyList).toBeInTheDocument();
  });

  // FIXME: need to fix
  // it("All templates are correctly rendered", () => {
  //   renderWithMockedProvider(<Templates />);
  //   const imgElements = screen.getAllByRole("img");
  //   expect(imgElements.length).toBe(3);
  // });
});
