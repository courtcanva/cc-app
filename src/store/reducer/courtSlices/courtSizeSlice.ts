import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface courtSizeState {
  [prop: string]: number;
}

export const initialState: courtSizeState = {
  initPointX: 75,
  initPointY: 150,
  courtAreaXLength: 1400,
  courtAreaYLength: 1500,
  threePointLineToCourtEdgeLenth: 90,
  cornerThreePointLineLength: 157.5,
  threePointLineRadius: 660,
  keyAreaWidth: 579,
  keyAreaHeight: 480,
  circleRadius: 180,
  strokeWidth: 20,
  borderLength: 150,
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
