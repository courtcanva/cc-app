import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface CourtSizeState {
  [prop: string]: number;
}

export const initialState: CourtSizeState = {
  courtAreaXLength: 28000,
  courtAreaYLength: 15000,
  threePointLineToCourtEdgeLength: 900,
  cornerThreePointLineLength: 1575,
  threePointLineRadius: 6600,
  keyAreaWidth: 5790,
  keyAreaHeight: 4800,
  circleRadius: 1800,
  strokeWidth: 200,
  borderLength: 1200,
};

export const courtSizeSlice = createSlice({
  name: "courtSize",
  initialState,
  reducers: {
    changeCourtSize: (state, action: PayloadAction<string>) => {
      // TODO
    },
    changeBorderLength: (state: CourtSizeState, action: PayloadAction<number>) => {
      return { ...state, borderLength: action.payload };
    },
  },
});

// export const borderSize = (state: CourtSizeState) =>
//   state.borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : initialState.borderLength;
export const courtWhiteLine = initialState.strokeWidth / 3;
export const dashedWhiteLine = initialState.strokeWidth / 5;
export const borderLength = initialState.borderLength;

export const { changeCourtSize, changeBorderLength } = courtSizeSlice.actions;
export const courtSizeData = (state: RootState) => state.courtSize;

export default courtSizeSlice.reducer;
