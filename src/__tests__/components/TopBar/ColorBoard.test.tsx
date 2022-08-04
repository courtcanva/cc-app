import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ColorBoard from "@/components/TopBar/ColorBoard";
import renderWithMockedProvider from "../../utils";
import store from "@/store/index";

describe("ColorBoard", () => {
  it("Should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);
    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });

  // it("Should render colors correctly", () => {
  //   renderWithMockedProvider(<ColorBoard />);
  //   for (const paintColor of mockPlateColors) {
  //     const colorElement = screen.getByTestId(paintColor);
  //     expect(colorElement).toHaveStyle({ "background-color": paintColor });
  //   }
  // });

  // it("should change store state color when the color border was clicked", () => {
  //   renderWithMockedProvider(<ColorBoard />);
  //   act(() => user.click(screen.getByTestId("#B61313")));
  //   const state = store.getState().courtColor;
  //   expect(state.selectedColor).toEqual("#B61313");
  // });
});
