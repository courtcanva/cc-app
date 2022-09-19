import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartControlState {
  isCartOpen: boolean;
}

export const initialState: CartControlState = {
  isCartOpen: false,
};

export const cartControlSlice = createSlice({
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

export const { switchCartDisplay, setCartDisplayState } = cartControlSlice.actions;

export default cartControlSlice.reducer;
