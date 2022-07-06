import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { useStoreSelector } from "../hooks";

export interface TileState {
  court: Court[];
  priceBar: PriceBar[];
}
export interface Court {
  location: string;
  color: string;
}

export interface PriceBar {
  color: string;
  quantity: number;
}

export interface ChangeTileColor {
  location: string;
  selectedColor: string;
}

export const initialState: TileState = {
  court: [
    {
      location: "threePoint",
      color: "#72818B",
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
    changeTileColor: (state, action: PayloadAction<ChangeTileColor>) => {
      const selectedLocation = state.court.findIndex(
        (object) => object.location === action.payload.location
      );
      state.court[selectedLocation].color = action.payload.selectedColor;
    },
    changeTileQuantity: (state, action: PayloadAction<PriceBar[]>) => {
      state.priceBar = action.payload;
    },
  },
});

export const { changeTileColor, changeTileQuantity } = tileSlice.actions;

export const TileData = (state: RootState) => state.tile;

export const getColor = (location: string) =>
  useStoreSelector(
    (state) => state.tile.court?.find((tile) => tile.location.includes(location))?.color
  );

export default tileSlice.reducer;
