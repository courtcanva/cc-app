import reducer, {
  changeCourtColor,
  initialState,
  CourtColorState,
} from "@/store/reducer/courtColorSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtColor;
  expect(state).toEqual(initialState);
});

it("should render correct title", () => {
  const previousState: CourtColorState = initialState;
  expect(reducer(previousState, changeCourtColor("#AA3A34"))).toEqual({ color: "#AA3A34" });
});
