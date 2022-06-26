import reducer, {
  initialState,
  CourtSizeState,
  changeCourtSize,
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
