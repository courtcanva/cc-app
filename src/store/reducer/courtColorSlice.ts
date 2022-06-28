import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtColorState {
  color: string;
}

export const initialState: CourtColorState = {
  color: "transparent",
};

export const CourtColorSlice = createSlice({
  name: "CourtColor",
  initialState,
  reducers: {
    changeCourtColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        color: action.payload,
      };
    },
  },
});

export const { changeCourtColor } = CourtColorSlice.actions;

export default CourtColorSlice.reducer;
