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
    court: [
      {
        location: "threePoint",
        color: "#8E9196",
      },
      {
        location: "courtArea",
        color: "#E18E11",
      },
      {
        location: "topKeyArea",
        color: "#B6B6B6",
      },
      {
        location: "border",
        color: "#834085",
      },
      {
        location: "keyArea",
        color: "#2C4E8A",
      },
      {
        location: "circleArea",
        color: "#B6B6B6",
      },
    ],
  });
});
