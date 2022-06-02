import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface ThreePointLineState {
  startPointX: number;
  startPointY: number;
  cornerThreePointLineLength: number;
  controlPointOneX: number;
  controlPointOneY: number;
  controlPointTwoX: number;
  controlPointTwoY: number;
  controlPointThreeX: number;
  controlPointThreeY: number;
  controlPointFourX: number;
  controlPointFourY: number;
  threePointLineRadius: number;
}

export const initialState: ThreePointLineState = {
  startPointX: 0,
  startPointY: 9,
  cornerThreePointLineLength: 15.75,
  controlPointOneX: 81.75,
  controlPointOneY: 9,
  controlPointTwoX: 81.75,
  controlPointTwoY: 75,
  controlPointThreeX: 81.75,
  controlPointThreeY: 141,
  controlPointFourX: 0,
  controlPointFourY: 141,
  threePointLineRadius: 66,
};

export const threePointLineSlice = createSlice({
  name: "threePointLine",
  initialState,
  reducers: {
    changeStartPoint: (state: ThreePointLineState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = threePointLineSlice.actions;

export const threePointLineData = (state: RootState) => state.threePointLine;

export default threePointLineSlice.reducer;
