import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface courtSizeState {
  [prop: string]: number;
}

export const initialState: courtSizeState = {
  courtAreaXLength: 14000,
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
  name: "courtSizeCourt",
  initialState,
  reducers: {
    changeStartPoint: (state: courtSizeState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = courtSizeSlice.actions;

export const courtSizeData = (state: RootState) => state.courtSize;

export default courtSizeSlice.reducer;
