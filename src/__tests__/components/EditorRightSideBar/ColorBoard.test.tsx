import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ColorBoard from "@/components/EditorRightSideBar/ColorBoard";
import renderWithMockedProvider from "../../utils";
import store from "@/store/index";
import { initialState, PriceBar } from "@/store/reducer/priceBarSlice";

describe("ColorBoard", () => {
  it("Should render color plate", () => {
    renderWithMockedProvider(<ColorBoard />);
    expect(screen.getByTestId("ColorBoard")).toBeTruthy();
  });
});
