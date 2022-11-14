import Templates from "@/components/EditorSideBar/Templates";
import { getByText, screen } from "@testing-library/dom";
import renderWithMockedProvider from "../../utils";

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

  it("Should render select option", () => {
    renderWithMockedProvider(<Templates />);
    const selectOption = screen.getByText("Court Category");
    expect(selectOption).toBeInTheDocument();
  });
});
