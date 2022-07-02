import reducer, {
  initialState,
  CourtSizeState,
  changeCourtSize,
  changeBorderLength,
} from "@/store/reducer/courtSizeSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtSize;
  expect(state).toEqual(initialState);
});

it("should render court size", () => {
  const previousState: CourtSizeState = initialState;
  expect(reducer(previousState, changeCourtSize(""))).toEqual(initialState);
});

it("should handle changeBorderLength", () => {
  const changedCourtSize = reducer(initialState, changeBorderLength(1000));
  expect(changedCourtSize.borderLength).toEqual(1000);
});
