import reducer, {
  switchRuler,
  initialState,
  ButtonToggleState,
} from "@/store/reducer/buttonToggleSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().buttonToggle;
  expect(state).toEqual(initialState);
});

it("should render correct button toggle state", () => {
  const previousState: ButtonToggleState = initialState;
  expect(reducer(previousState, switchRuler(false))).toEqual({
    ...previousState,
    isRulerOn: false,
  });
});
