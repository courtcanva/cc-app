import store from "@/store/index";
import reducer, { initialState, tileState, changeTileColor } from "@/store/reducer/tileSlice";

it("should return the initial state", () => {
  const state = store.getState().tile;
  expect(state).toEqual(initialState);
});

it("should change tile color", () => {
  // TODO: temporary solution, should be changed later
  const previousState: tileState[] = initialState;
  expect(
    reducer(previousState, changeTileColor({ location: "border", selectedColor: "#195955" }))
  ).toEqual(previousState);
});
