import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ColorBoard from "@/components/TopBar/ColorBoard";
import mockPlateColors from "@/components/TopBar/colorList";
import renderWithMockedProvider from "../../utils";
import store from "@/store/index";
import reducer, {
  changeSelectedColor,
  initialState,
  CourtColorState,
} from "@/store/reducer/courtColorSlice";

describe("ColorBoard", () => {
  it("Should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);
    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });

  it("Should render colors correctly", () => {
    renderWithMockedProvider(<ColorBoard />);
    for (const color of mockPlateColors) {
      const colorElement = screen.getByTestId(color);
      expect(colorElement).toHaveStyle({ "background-color": color });
    }
  });

  it("should change store state color when the color border was clicked", () => {
    renderWithMockedProvider(<ColorBoard />);
    act(() => user.click(screen.getByTestId("#AA3A34")));
    const state = store.getState().courtColor;
    expect(state.selectedColor).toEqual("#AA3A34");
  });
});
