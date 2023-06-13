import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceBar {
  color: string;
  quantity: number;
}

export interface PriceBarState {
  blocks: PriceBar[];
}

export const initialState: PriceBarState = {
  blocks: [],
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
