import { render, screen, fireEvent } from "@testing-library/react";
import EditorSideBar from "@/components/EditorSideBar";
import sideBarItemList from "@/components/EditorSideBar/SideBarItemList";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("EditorSideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    renderWithMockedProvider(<EditorSideBar />);
    const bluePrintsText = screen.getByText("Basketball");
    const folderText = screen.getByText("Folder");
    const templateText = screen.getByText("Template");

    expect(bluePrintsText).toBeInTheDocument();
    expect(folderText).toBeInTheDocument();
    expect(templateText).toBeInTheDocument();
  });

  test("When clicking icon button and closing button should be working", () => {
    renderWithMockedProvider(<EditorSideBar />);
    const element = screen.getByText("Basketball");

    userEvent.click(element);
    const closingBtn = screen.getByRole("button");
    expect(closingBtn).toBeInTheDocument();

    userEvent.click(closingBtn);
    expect(closingBtn).not.toBeInTheDocument();

    userEvent.click(element);
    userEvent.click(element);
    expect(closingBtn).not.toBeInTheDocument();
  });
});
