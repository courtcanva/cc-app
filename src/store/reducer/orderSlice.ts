import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "@/interfaces/cartItem";

export const initialState: ICartItem[] = [];

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderItems: (state: ICartItem[], action: PayloadAction<ICartItem[]>) => {
      return action.payload;
    },
  },
});

export const { addOrderItems } = orderSlice.actions;

export default orderSlice.reducer;
