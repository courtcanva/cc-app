import reducer, {
  changeStartPoint,
  initialState,
  KeyAreaState,
} from "@/store/reducer/courtSlices/keyAreaSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().keyArea;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  const previousState: KeyAreaState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
