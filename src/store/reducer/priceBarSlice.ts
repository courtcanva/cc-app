import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface PriceBar {
  color: string;
  quantity: number;
}

export interface PriceBarState {
  blocks: PriceBar[];
}
export const initialState: PriceBarState = {
  blocks: [
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

export const priceBarSlice = createSlice({
  name: "priceBar",
  initialState,
  reducers: {
    changeTileQuantity: (state, action: PayloadAction<PriceBar[]>) => {
      state.blocks = action.payload;
    },
  },
});

export const { changeTileQuantity } = priceBarSlice.actions;

export const priceBarData = (state: RootState) => state.priceBar;

export default priceBarSlice.reducer;
