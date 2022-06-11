import reducer, {
  changeStartPoint,
  initialState,
  TopKeyAreaState,
} from "@/store/reducer/courtSlices/topKeyAreaSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().topKeyArea;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  const previousState: TopKeyAreaState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
