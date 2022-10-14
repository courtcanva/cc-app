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
      quantity: 1273,
    },
    {
      color: "#B61313",
      quantity: 2688,
    },
    {
      color: "#195955",
      quantity: 1000,
    },
    {
      color: "#2C4E8A",
      quantity: 624,
    },
    {
      color: "#606F14",
      quantity: 115,
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

export default priceBarSlice.reducer;
