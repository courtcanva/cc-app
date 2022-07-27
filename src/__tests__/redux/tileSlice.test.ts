import store from "@/store/index";
import reducer, { initialState, changeTileColor, TileState } from "@/store/reducer/tileSlice";
import { StateWithHistory } from "redux-undo";

it("should return the initial state", () => {
  const state = store.getState().tile.present;
  expect(state).toEqual(initialState);
});

it("should change tile color", () => {
  const previousState: StateWithHistory<TileState> = store.getState().tile;
  expect(
    reducer(previousState, changeTileColor({ selectedColor: "#8E9196", location: "threePoint" }))
      .present
  ).toEqual({
    designTileList: [],
    court: [
      {
        location: "threePoint",
        color: "#8E9196",
      },
      {
        location: "courtArea",
        color: "#B61313",
      },
      {
        location: "topKeyArea",
        color: "#B61313",
      },
      {
        location: "border",
        color: "#195955",
      },
      {
        location: "keyArea",
        color: "#2C4E8A",
      },
      {
        location: "circleArea",
        color: "#606F14",
      },
    ],
  });
});
