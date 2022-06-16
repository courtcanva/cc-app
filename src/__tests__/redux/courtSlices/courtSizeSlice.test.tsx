import reducer, {
  changeStartPoint,
  initialState,
  courtSizeState,
} from "@/store/reducer/courtSlices/courtSizeSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtSize;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  // TODO: temporary solution, should be changed later
  const previousState: courtSizeState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
