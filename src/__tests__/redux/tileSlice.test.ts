import store from "@/store/index";
import reducer, {
  initialState,
  changeTileColor,
  TileState,
  changeTileQuantity,
} from "@/store/reducer/tileSlice";

it("should return the initial state", () => {
  const state = store.getState().tile;
  expect(state).toEqual(initialState);
});

it("should change tile color", () => {
  // TODO: temporary solution, should be changed later
  const previousState: TileState = initialState;
  expect(
    reducer(previousState, changeTileColor({ location: "border", selectedColor: "#195955" }))
  ).toEqual(previousState);
});

it("should change tile quantity", () => {
  const previousState: TileState = initialState;
  expect(
    reducer(
      previousState,
      changeTileQuantity([
        { color: "#72818B", quantity: 1277 },
        { color: "#B61313", quantity: 2576 },
      ])
    )
  ).toEqual({
    ...previousState,
    priceBar: [
      { color: "#72818B", quantity: 1277 },
      { color: "#B61313", quantity: 2576 },
    ],
  });
});
