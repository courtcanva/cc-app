import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface tileState {
  type: string;
  color: string;
  quantity: number;
}

export const initialState: tileState[] = [
  {
    type: "courtArea",
    color: "#72818B",
    quantity: 230,
  },
  {
    type: "circleArea",
    color: "#B61313",
    quantity: 130,
  },
  {
    type: "keyArea",
    color: "#195955",
    quantity: 110,
  },
  {
    type: "border",
    color: "#2C4E8A",
    quantity: 100,
  },
  {
    type: "topKeyArea",
    color: "#B59F7A",
    quantity: 60,
  },
  {
    type: "threePoint",
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
