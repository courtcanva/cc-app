import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface TileState {
  type: string;
  color: string;
  quantity: number;
}

export const initialState: TileState[] = [
  {
    type: "courtArea",
    color: "#72818B",
    quantity: 230,
  },
  {
    type: "border",
    color: "#B61313",
    quantity: 130,
  },
  {
    type: "threePoint",
    color: "#E18752",
    quantity: 130,
  },
  {
    type: "keyArea",
    color: "#2C4E8A",
    quantity: 110,
  },
  {
    type: "circleArea",
    color: "#B59F7A",
    quantity: 100,
  },
  {
    type: "topKeyArea",
    color: "#606F14",
    quantity: 60,
  },
];

export const TileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {},
});

export const TileData = (state: RootState) => state.tile;

export default TileSlice.reducer;
