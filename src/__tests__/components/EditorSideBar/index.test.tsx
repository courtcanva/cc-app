import { render, screen, fireEvent } from "@testing-library/react";
import EditorSideBar from "@/components/EditorSideBar";
import sideBarItemList from "@/components/EditorSideBar/SideBarItemList";
import renderWithMockedProvider from "../../utils";

describe("EditorSideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    render(<EditorSideBar />);
    const bluePrintsText = screen.getByText("Blueprints");
    const folderText = screen.getByText("Folder");

    expect(bluePrintsText).toBeInTheDocument();
    expect(folderText).toBeInTheDocument();
  });

  it("When clicking icon button and closing button should be working", () => {
    renderWithMockedProvider(<EditorSideBar />);

    sideBarItemList.map((item) => {
      const element = screen.getByText(item.title);

      fireEvent.click(element);
      const closingBtn = screen.getByRole("button");
      expect(closingBtn).toBeInTheDocument();

      fireEvent.click(closingBtn);
      expect(closingBtn).not.toBeInTheDocument();

      fireEvent.click(element);
      fireEvent.click(element);
      expect(closingBtn).not.toBeInTheDocument();
    });
  });
});
