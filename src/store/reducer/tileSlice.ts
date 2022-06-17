import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface tileState {
  location: Array<string>;
  color: string;
  quantity: number;
}

export const initialState: tileState[] = [
  {
    location: ["threePoint"],
    color: "#72818B",
    quantity: 230,
  },
  {
    location: ["courtArea", "topKeyArea"],
    color: "#B61313",
    quantity: 130,
  },
  {
    location: ["border"],
    color: "#195955",
    quantity: 110,
  },
  {
    location: ["keyArea"],
    color: "#2C4E8A",
    quantity: 100,
  },
  {
    location: ["circleArea"],
    color: "#606F14",
    quantity: 130,
  },
];

export const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    changeTileColor: (state, action: PayloadAction<string>) => {
      // TODO COLOR CHANGE
    },
  },
});

export const { changeTileColor } = tileSlice.actions;

export const TileData = (state: RootState) => state.tile;

export default tileSlice.reducer;
