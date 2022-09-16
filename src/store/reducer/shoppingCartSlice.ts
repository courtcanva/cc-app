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
      console.log(state.isCartOpen);
    },
  },
});

export const { switchCartDisplay } = cartControlSlice.actions;

export default cartControlSlice.reducer;
