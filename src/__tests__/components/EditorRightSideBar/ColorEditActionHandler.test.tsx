import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DesignTools from "@/components/EditorRightSideBar/DesignTools";
import renderWithMockedProvider from "../../utils";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("DesignTolls actionButtons", () => {
  it("should invoke the corresponding method when click the button", () => {
    const mockDispatch = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

    renderWithMockedProvider(<DesignTools />);
    const undoBtn = screen.getByRole("button", { name: /Revert edit/i });
    const redoBtn = screen.getByRole("button", { name: /Forward edit/i });
    const resetBtn = screen.getByRole("button", { name: /Reset edit/i });

    user.click(undoBtn);
    expect(mockDispatch).toHaveBeenCalled();

    user.click(redoBtn);
    expect(mockDispatch).toHaveBeenCalled();

    user.click(resetBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
