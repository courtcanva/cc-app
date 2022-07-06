import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MouseTypeState {
  autoMouse: boolean;
}

export const initialState: MouseTypeState = {
  autoMouse: true,
};

export const mouseTypeSlice = createSlice({
  name: "MouseType",
  initialState,
  reducers: {
    changeMouseType: (state: MouseTypeState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        autoMouse: action.payload,
      };
    },
  },
});

export const { changeMouseType } = mouseTypeSlice.actions;

export default mouseTypeSlice.reducer;
