import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtNameState {
  name: string;
}

export const initialState: CourtNameState = {
  name: "510 m² Pro Court (17 m × 30 m)"
};

export const courtNameSlice = createSlice({
  name: "CourtName",
  initialState,
  reducers: {
    changeCourtName: (state: CourtNameState, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
  },
});

export const { changeCourtName } = courtNameSlice.actions;

export default courtNameSlice.reducer;
