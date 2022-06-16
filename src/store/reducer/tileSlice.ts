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

export const TileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {},
});

export const TileData = (state: RootState) => state.tile;

export default TileSlice.reducer;
