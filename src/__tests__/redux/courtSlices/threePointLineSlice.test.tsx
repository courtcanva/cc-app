import reducer, {
  changeStartPoint,
  initialState,
  ThreePointLineState,
} from "@/store/reducer/courtSlices/threePointLineSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().threePointLine;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  // TODO: temporary solution, should be changed later
  const previousState: ThreePointLineState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
