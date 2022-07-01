import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtColorState {
  selectedColor: string;
}

export const initialState: CourtColorState = {
  selectedColor: "none",
};

export const CourtColorSlice = createSlice({
  name: "CourtColor",
  initialState,
  reducers: {
    changeSelectedColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedColor: action.payload,
      };
    },
  },
});

export const { changeSelectedColor } = CourtColorSlice.actions;

export default CourtColorSlice.reducer;
