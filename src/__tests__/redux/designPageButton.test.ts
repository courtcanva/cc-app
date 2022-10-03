import reducer, {
  switchRuler,
  initialState,
  DesignPageButtonState,
} from "@/store/reducer/designPageButtonSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().designPageButton;
  expect(state).toEqual(initialState);
});

it("should render correct design-page-button state", () => {
  const previousState: DesignPageButtonState = initialState;
  expect(reducer(previousState, switchRuler(false))).toEqual({
    ...previousState,
    ruler: false,
  });
});
