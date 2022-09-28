import store from "@/store/index";
import reducer, { initialState, useDrag, DragControlState } from "@/store/reducer/dragControlSlice";

it("should return the initial state", () => {
  const state = store.getState().dragControl;
  expect(state).toEqual(initialState);
});

it("should change drag state", () => {
  const previousState: DragControlState = initialState;
  expect(reducer(previousState, useDrag(true))).toEqual({ dragState: true });
});
