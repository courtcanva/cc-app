import userEvent from "@testing-library/user-event";
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

    const { getByTestId } = renderWithMockedProvider(<DesignTools />);

    const undoBtn = getByTestId("undoBtn");
    const redoBtn = getByTestId("redoBtn");
    const resetBtn = getByTestId("resetBtn");

    userEvent.click(undoBtn);
    expect(mockDispatch).toHaveBeenCalled();

    userEvent.click(redoBtn);
    expect(mockDispatch).toHaveBeenCalled();

    userEvent.click(resetBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
