import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface TileState {
  court: Court[];
  priceBar: PriceBar[];
}
export interface Court {
  location: string;
  color: string;
  quantity: number;
}

export interface PriceBar {
  color: string;
  quantity: number;
}
export const initialState: TileState = {
  court: [
    {
      location: "threePoint",
      color: "#72818B",
      quantity: 1277,
    },
    {
      location: "courtArea",
      color: "#B61313",
      quantity: 2472,
    },
    {
      location: "topKeyArea",
      color: "#B61313",
      quantity: 104,
    },
    {
      location: "border",
      color: "#195955",
      quantity: 1098,
    },
    {
      location: "keyArea",
      color: "#2C4E8A",
      quantity: 637,
    },
    {
      location: "circleArea",
      color: "#606F14",
      quantity: 130,
    },
  ],
  priceBar: [
    {
      color: "#72818B",
      quantity: 1277,
    },
    {
      color: "#B61313",
      quantity: 2576,
    },
    {
      color: "#195955",
      quantity: 1098,
    },
    {
      color: "#2C4E8A",
      quantity: 637,
    },
    {
      color: "#606F14",
      quantity: 130,
    },
  ],
};

export const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    /* istanbul ignore next */
    changeTileColor: (state, action: PayloadAction<any>) => {
      const selectedLocation = state.court.findIndex(
        (object) => object.location === action.payload.location
      );
      state.court[selectedLocation].color = action.payload.selectedColor;
    },
    changeTileQuantity: (state, action: PayloadAction<any>) => {
      state.priceBar = action.payload;
    },
  },
});

export const { changeTileColor, changeTileQuantity } = tileSlice.actions;

export const TileData = (state: RootState) => state.tile;

export default tileSlice.reducer;
