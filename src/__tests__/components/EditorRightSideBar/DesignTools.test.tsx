import { screen, fireEvent } from "@testing-library/react";
import DesignTools from "@/components/EditorRightSideBar/DesignTools";
import renderWithMockedProvider from "../../utils";
// import { switchSideBar } from "@/store/reducer/buttonToggleSlice";
// import { undo, redo } from "redux-undo";
// import { resetAll } from "@/store/reducer/canvasControlSlice";
import ColorBoard from "@/components/TopBar/ColorBoard";

// jest.mock("@/store/reducer/buttonToggleSlice", () => ({
//   switchSideBar: jest.fn(),
// }));

// jest.mock("redux-undo", () => ({
//   undo: jest.fn(),
//   redo: jest.fn(),
// }));

// jest.mock("@/store/reducer/canvasControlSlice", () => ({
//   resetAll: jest.fn(),
// }));

describe("DesignTolls component", () => {
  test("Each button in the Design Tools component to display the correct text", () => {
    renderWithMockedProvider(<DesignTools />);
    const paintBucketBtn = screen.getByTestId("colorSelectBtn");
    const undoBtn = screen.getByTestId("undoBtn");
    const redoBtn = screen.getByTestId("redoBtn");
    const resetBtn = screen.getByTestId("resetBtn");

    expect(paintBucketBtn).toBeInTheDocument();
    expect(undoBtn).toBeInTheDocument();
    expect(redoBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  test("Should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);
    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });

  // test("undo, redo, reset buttons trigger correct actions", () => {
  //   renderWithMockedProvider(<DesignTools />);
  //   const undoBtn = screen.getByTestId("undoBtn");
  //   const redoBtn = screen.getByTestId("redoBtn");
  //   const resetBtn = screen.getByTestId("resetBtn");

  //   fireEvent.click(undoBtn);
  //   fireEvent.click(redoBtn);
  //   fireEvent.click(resetBtn);

  //   expect(switchSideBar).toHaveBeenCalledWith(false);
  //   expect(undo).toHaveBeenCalled();
  //   expect(redo).toHaveBeenCalled();
  //   expect(resetAll).toHaveBeenCalled();
  // });
});
