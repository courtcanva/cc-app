import reducer, {
  initialState,
  CourtSizeState,
  changeCourtSize,
  dimensionColor,
} from "@/store/reducer/courtSizeSlice";
import store from "@/store/index";
import { MIN_DIMENSION_BOX } from "@/constants/courtSize";

it("should return the initial state", () => {
  const state = store.getState().courtSize;
  expect(state).toEqual(initialState);
});

it("should render court size", () => {
  const previousState: CourtSizeState = initialState;
  expect(reducer(previousState, changeCourtSize(""))).toEqual(initialState);
});

it("should have white color", () => {
  initialState.borderLength >= MIN_DIMENSION_BOX;
  expect(dimensionColor).toEqual("white");
});
