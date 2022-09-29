import store from "@/store/index";
import reducer, {
  initialState,
  zoomIn,
  zoomOut,
  resetZoomScale,
  ZoomState,
  resetZoomState,
} from "@/store/reducer/zoomCourtSlice";

it("should return the initial state", () => {
  const state = store.getState().zoomControl;
  expect(state).toEqual(initialState);
});
it("should increase the zoom scale by one step", () => {
  const previousState = initialState;
  expect(reducer(previousState, zoomIn()).zoomScale).toEqual(1.1);
});
it("should decrease the zoom scale by one step", () => {
  const previousState = initialState;
  expect(reducer(previousState, zoomOut()).zoomScale).toEqual(0.9);
});
it("should reset the state to initial state", () => {
  const previousState: ZoomState = {
    zoomScale: 1.5,
    resetState: false,
  };
  expect(reducer(previousState, resetZoomScale()).zoomScale).toEqual(1);
});
it("should switch resetState", () => {
  const previousState = initialState;
  expect(reducer(previousState, resetZoomState()).resetState === true);
});
