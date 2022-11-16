import Folder from "@/components/EditorSideBar/Folder";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("Render folder", () => {
  it("should render initial empty folder correctly", () => {
    const { container } = renderWithMockedProvider(<Folder />);
    expect(container).toMatchSnapshot();
    const emptyList = screen.getByText(/the folder list is empty/i);
    expect(emptyList).toBeInTheDocument();
  });
});
