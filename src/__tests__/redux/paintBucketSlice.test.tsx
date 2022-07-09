import reducer, {
  usePaintBucket,
  initialState,
  PaintBucketState,
} from "@/store/reducer/paintBucketSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().paintBucket;
  expect(state).toEqual(initialState);
});

it("should render correct paint popover state", () => {
  const previousState: PaintBucketState = initialState;
  expect(reducer(previousState, usePaintBucket(true))).toEqual({
    ...previousState,
    paintPopover: true,
  });
});
