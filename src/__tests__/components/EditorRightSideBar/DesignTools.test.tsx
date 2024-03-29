import { screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import DesignTools from "@/components/EditorRightSideBar/DesignTools";
import renderWithMockedProvider from "../../utils";
import ColorBoard from "@/components/EditorRightSideBar/DesignTools/ColorBoard";
import { switchBadgeUpload } from "@/store/reducer/buttonToggleSlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("DesignTolls component", () => {
  test("Each element in the Design Tools component to display the correct text", () => {
    renderWithMockedProvider(<DesignTools />);
    const paintBucketBtn = screen.getByRole("button", { name: /Rb/i });
    const undoBtn = screen.getByRole("button", { name: /Revert edit/i });
    const redoBtn = screen.getByRole("button", { name: /Forward edit/i });
    const resetBtn = screen.getByRole("button", { name: /Reset edit/i });
    const customizeBtn = screen.getByRole("button", { name: /Custom size/i });
    const slider = screen.getByRole("slider");

    expect(paintBucketBtn).toBeInTheDocument();
    expect(undoBtn).toBeInTheDocument();
    expect(redoBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
    expect(customizeBtn).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it("should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);
    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });

  it("should change value when slide the arrow", () => {
    renderWithMockedProvider(<DesignTools />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { ariaValueNow: "1" } });
    const sliderValue = screen.getByText("1.0");
    expect(sliderValue).toBeInTheDocument();
  });

  it("should", () => {
    renderWithMockedProvider(<DesignTools />);
    const uploadBtn = screen.getByRole("button", { name: /Upload Badge/i });
    user.click(uploadBtn);
    expect(mockDispatch).toBeCalledWith(switchBadgeUpload(true));
  });
});
