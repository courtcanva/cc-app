import store from "@/store/index";
import reducer, {
  initialState,
  dragSwitch,
  dragState,
  DragControlState,
} from "@/store/reducer/dragControlSlice";

it("should return the initial state", () => {
  const state = store.getState().dragControl;
  expect(state).toEqual(initialState);
});

it("should change drag disable to activate", () => {
  const previousState: DragControlState = initialState;
  expect(reducer(previousState, dragSwitch(true))).toEqual({
    dragActivate: true,
    dragStart: false,
  });
});

it("should change drag state to true ", () => {
  const previousState: DragControlState = initialState;
  expect(reducer(previousState, dragState(true))).toEqual({ dragActivate: false, dragStart: true });
});
