import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface CourtSizeState {
  courtId: string;
  courtAreaXLength: number;
  courtAreaYLength: number;
  threePointLineToCourtEdgeLength: number;
  cornerThreePointLineLength: number;
  threePointLineRadius: number;
  keyAreaWidth: number;
  keyAreaHeight: number;
  circleRadius: number;
  strokeWidth: number;
  borderLength: number;
}

export const initialState: CourtSizeState = {
  courtId: "62c432cfb8a9c5f61f03831f",
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
};

export const courtSizeSlice = createSlice({
  name: "courtSize",
  initialState,
  reducers: {
    changeCourtSize: (state: CourtSizeState, action: PayloadAction<CourtSizeState>) => {
      return { ...state, ...action.payload };
    },
  },
});

// export const borderSize = (state: CourtSizeState) =>
//   state.borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : initialState.borderLength;
export const courtWhiteLine = initialState.strokeWidth / 3;
export const dashedWhiteLine = initialState.strokeWidth / 5;

export const { changeCourtSize } = courtSizeSlice.actions;
export const courtSizeData = (state: RootState) => state.courtSize;

export default courtSizeSlice.reducer;
