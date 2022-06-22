import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MIN_DIMENSION_BOX } from "../../constants/courtSize";

export interface CourtSizeState {
  [prop: string]: number;
}

export const initialState: CourtSizeState = {
  courtAreaXLength: 28000,
  courtAreaYLength: 15000,
  threePointLineToCourtEdgeLenth: 900,
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
    getCourtSize: (state: CourtSizeState, action: PayloadAction) => {
      // TODO
    },
  },
});

export const dimensionColor = initialState.borderLength < MIN_DIMENSION_BOX ? "black" : "white";
export const borderSize =
  initialState.borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : initialState.borderLength;
export const courtWhiteLine = initialState.strokeWidth / 3;
export const dashedWhiteLine = initialState.strokeWidth / 5;

export const { getCourtSize } = courtSizeSlice.actions;
export const courtSizeData = (state: RootState) => state.courtSize;

export default courtSizeSlice.reducer;
