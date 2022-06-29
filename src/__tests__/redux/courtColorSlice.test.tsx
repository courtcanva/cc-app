import reducer, {
  changeSelectedColor,
  initialState,
  CourtColorState,
} from "@/store/reducer/courtColorSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtColor;
  expect(state).toEqual(initialState);
});

it("should render correct color", () => {
  const previousState: CourtColorState = initialState;
  expect(reducer(previousState, changeSelectedColor("#AA3A34"))).toEqual({
    ...previousState,
    selectedColor: "#AA3A34",
  });
});
