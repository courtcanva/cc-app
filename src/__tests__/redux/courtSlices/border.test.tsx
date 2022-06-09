import reducer, {
  changeStartPoint,
  initialState,
  BorderState,
} from "@/store/reducer/courtSlices/borderSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().border;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  const previousState: BorderState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
