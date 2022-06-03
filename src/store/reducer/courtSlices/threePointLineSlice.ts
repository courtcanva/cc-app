import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface ThreePointLineState {
  [prop: string]: number;
}

export const initialState: ThreePointLineState = {
  startPointX: 30,
  startPointY: 134,
  cornerThreePointLineLength: 15.75,
  controlPointOneX: 111.75,
  controlPointOneY: 134,
  controlPointTwoX: 111.75,
  controlPointTwoY: 200,
  controlPointThreeX: 111.75,
  controlPointThreeY: 266,
  controlPointFourX: 45.7,
  controlPointFourY: 266,
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
