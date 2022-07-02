import reducer, {
  switchRuler,
  initialState,
  RulerControlState,
} from "@/store/reducer/rulerControlSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().rulerControl;
  expect(state).toEqual(initialState);
});

it("should render correct ruler state", () => {
  const previousState: RulerControlState = initialState;
  expect(reducer(previousState, switchRuler(false))).toEqual({
    ...previousState,
    ruler: false,
  });
});
