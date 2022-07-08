import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtNameState {
  name: string;
  courtId: string;
}

export const initialState: CourtNameState = {
  name: "510 m² Pro Court (17 m × 30 m)",
  courtId: "62c432cfb8a9c5f61f03831f",
};

export const courtNameSlice = createSlice({
  name: "CourtName",
  initialState,
  reducers: {
    changeCourtName: (state: CourtNameState, action: PayloadAction<CourtNameState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeCourtName } = courtNameSlice.actions;

export default courtNameSlice.reducer;
