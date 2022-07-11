import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TotalPriceState {
  budget: string;
}

export const initialState: TotalPriceState = {
  budget: "0",
};

export const totalPriceSlice = createSlice({
  name: "TotalPrice",
  initialState,
  reducers: {
    changeTotalPrice: (state: TotalPriceState, action: PayloadAction<string>) => {
      return {
        ...state,
        budget: action.payload,
      };
    },
  },
});

export const { changeTotalPrice } = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
