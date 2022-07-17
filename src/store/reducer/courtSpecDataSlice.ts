import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CourtSizeState } from "./courtSizeSlice";

export const initialState: CourtSizeState[] = [
  {
    courtId: "62c432cfb8a9c5f61f03831f",
    courtName: "Pro Full Court",
    courtAreaXLength: 28000,
    courtAreaYLength: 15000,
    threePointLineToCourtEdgeLength: 900,
    cornerThreePointLineLength: 1575,
    threePointLineRadius: 6600,
    keyAreaWidth: 5790,
    keyAreaHeight: 4800,
    circleRadius: 1800,
    strokeWidth: 200,
    borderLength: 1000,
  },
];

export const Slice = createSlice({
  name: "courtSpecData",
  initialState,
  reducers: {
    getCourtSpecData: (state, action: PayloadAction<CourtSizeState[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

export const { getCourtSpecData } = Slice.actions;
export const courtSpecData = (state: RootState) => state.courtSpecData;

export default Slice.reducer;
