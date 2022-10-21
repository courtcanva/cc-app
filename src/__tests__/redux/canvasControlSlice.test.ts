import store from "@/store/index";
import reducer, {
  initialState,
  changeZoomScale,
  canvasState,
  dragSwitch,
  dragState,
  resetAll,
} from "@/store/reducer/canvasControlSlice";

it("should return the initial state", () => {
  const state = store.getState().canvasControl;
  expect(state).toEqual(initialState);
});

it("should increase the zoom scale by one step", () => {
  const previousState = initialState;
  expect(reducer(previousState, changeZoomScale(true)).zoomScale).toEqual(1.1);
});

it("should decrease the zoom scale by one step", () => {
  const previousState = initialState;
  expect(reducer(previousState, changeZoomScale(false)).zoomScale).toEqual(0.9);
});

it("should change drag disable to activate", () => {
  const previousState: canvasState = initialState;
  expect(reducer(previousState, dragSwitch(true)).dragActivate).toEqual(true);
});

it("should change drag state to true", () => {
  const previousState: canvasState = initialState;
  expect(reducer(previousState, dragState(true)).dragStart).toEqual(true);
});

it("should reset all states and scales to initial", () => {
  const previousState: canvasState = {
    zoomScale: 1.5,
    dragActivate: true,
    dragStart: true,
    resetState: false,
    screenshot: null,
  };
  expect(reducer(previousState, resetAll())).toEqual({
    zoomScale: 1,
    dragStart: false,
    dragActivate: false,
    resetState: true,
    screenshot: null,
  });
});
