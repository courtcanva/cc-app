import { mockDesignData } from "@/components/MockData/MockDesignData";
import FolderListItem from "@/components/FolderList/FolderListItem";
import { screen } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("Render folder list", () => {
  it("Should render folder list item correctly", () => {
    const funMock = jest.fn();
    const { container } = renderWithMockedProvider(
      <FolderListItem design={mockDesignData[0]} handleCourtSelecting={funMock} />
    );
    expect(container).toMatchSnapshot();
    const item = screen.getByTestId("folderListItems-0");
    userEvent.click(item);
    expect(funMock).toBeCalled();
  });

  it("Should render opacity correctly", () => {
    const { container } = renderWithMockedProvider(
      <FolderListItem design={mockDesignData[0]} activateDesign="folderListItems - 1" />
    );
    expect(container).toMatchSnapshot();
    // todo: add 0.4 version
  });
});
