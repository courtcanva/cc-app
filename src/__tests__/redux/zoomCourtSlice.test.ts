import store from "@/store/index";
import reducer, {
  initialState,
  zoomIn,
  zoomOut,
  resetZoom,
  ZoomState,
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
  };
  expect(reducer(previousState, resetZoom()).zoomScale).toEqual(1);
});
