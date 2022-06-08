import reducer, {
  changeStartPoint,
  initialState,
  CourtAreaState,
} from "@/store/reducer/courtSlices/courtAreaSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtArea;
  expect(state).toEqual(initialState);
});

it("should handle coordinates", () => {
  const previousState: CourtAreaState = initialState;
  expect(reducer(previousState, changeStartPoint())).toEqual(initialState);
});
