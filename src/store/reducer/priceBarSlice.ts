import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface priceBarState {
  color: string;
  quantity: number;
}

export const initialState: priceBarState[] = [];

export const priceBarSlice = createSlice({
  name: "priceBar",
  initialState,
  reducers: {
    /* istanbul ignore next */
    changeEstimatedTiles: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { changeEstimatedTiles } = priceBarSlice.actions;

export const PriceBarData = (state: RootState) => state.priceBar;

export default priceBarSlice.reducer;
