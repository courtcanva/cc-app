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
    const templateProps: Props = {
      offset: 0,
      templatesData: [],
      isLoading: false,
      hasNextPage: false,
      setOffset: jest.fn,
      setPageNum: jest.fn,
    };
    renderWithMockedProvider(<Templates {...templateProps} />);
    const emptyList = screen.getByText(/the template list is empty/i);
    expect(emptyList).toBeInTheDocument();
  });

  it("All templates are correctly rendered", () => {
    const templateProps: Props = {
      offset: 0,
      templatesData: mockTemplateDataRaw,
      isLoading: false,
      hasNextPage: false,
      setOffset: jest.fn,
      setPageNum: jest.fn,
    };
    renderWithMockedProvider(<Templates {...templateProps} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(3);
  });
});
