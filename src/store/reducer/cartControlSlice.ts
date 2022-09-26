import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartControlState {
  isCartOpen: boolean;
}

const initialState: CartControlState = {
  isCartOpen: false,
};

export const CartControlSlice = createSlice({
  name: "CartControl",
  initialState,
  reducers: {
    switchCartDisplay: (state: CartControlState) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartDisplayState: (state: CartControlState, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const { switchCartDisplay, setCartDisplayState } = CartControlSlice.actions;

export const getCartDisplayCondition = (state: CartControlState) => state.isCartOpen;

export default CartControlSlice.reducer;
