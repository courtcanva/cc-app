import store from "@/store/index";
import reducer, {
  initialState,
  changeTileQuantity,
  PriceBarState,
} from "@/store/reducer/priceBarSlice";

it("should return the initial state", () => {
  const state = store.getState().priceBar;
  expect(state).toEqual(initialState);
});

it("should change tile quantity", () => {
  const previousState: PriceBarState = initialState;
  expect(
    reducer(
      previousState,
      changeTileQuantity([
        { color: "#72818B", quantity: 1277 },
        { color: "#B61313", quantity: 2576 },
      ])
    )
  ).toEqual({
    blocks: [
      { color: "#72818B", quantity: 1277 },
      { color: "#B61313", quantity: 2576 },
    ],
  });
});
